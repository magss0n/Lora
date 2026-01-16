import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CooperativeApiService } from '../../../core/services/cooperative-api';
import { CooperativeDto } from '../../../core/interfaces/cooperative-api';

@Component({
  selector: 'app-cooperatives',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './cooperatives.html',
  styleUrl: './cooperatives.scss',
})
export class Cooperatives implements OnInit {
  private readonly api = inject(CooperativeApiService);
  private readonly fb = inject(FormBuilder);

  cooperatives: CooperativeDto[] = [];

  loading = false;
  saving = false;
  errorMessage: string | null = null;

  showCreateModal = false;

  form = this.fb.group({
    registrationNumber: ['', [Validators.required]],
    name: ['', [Validators.required]],
    location: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.loadCooperatives();
  }

  loadCooperatives(): void {
    this.loading = true;
    this.errorMessage = null;

    this.api.getAll().subscribe({
      next: (coops) => {
        this.cooperatives = coops;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load cooperatives.';
        this.loading = false;
      },
    });
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    this.errorMessage = null;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.form.reset();
  }

  createCooperative(): void {
    this.errorMessage = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.saving = true;
    this.api
      .create({
        registrationNumber: String(this.form.value.registrationNumber),
        name: String(this.form.value.name),
        location: String(this.form.value.location),
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.closeCreateModal();
          this.loadCooperatives();
        },
        error: (err) => {
          console.error(err);
          this.saving = false;
          this.errorMessage = 'Failed to create cooperative.';
        },
      });
  }
}
