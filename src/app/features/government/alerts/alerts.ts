import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationApiService } from '../../../core/services/notification-api';
import {
  NotificationDto,
  NotificationSeverity,
  NotificationStatus,
  NotificationType,
} from '../../../core/interfaces/notification-api';

@Component({
  selector: 'app-alerts',
  imports: [ReactiveFormsModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
})
export class Alerts implements OnInit {
  private readonly api = inject(NotificationApiService);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly showCreateModal = signal(false);
  readonly showViewModal = signal(false);

  readonly alerts = signal<NotificationDto[]>([]);
  readonly selectedAlert = signal<NotificationDto | null>(null);

  readonly typeOptions: NotificationType[] = ['FLOOD', 'FIRE', 'PEST', 'DISEASE', 'OTHER'];
  readonly severityOptions: NotificationSeverity[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  readonly statusOptions: NotificationStatus[] = ['NEW', 'IN_PROGRESS', 'RESOLVED'];

  readonly filterForm = this.fb.nonNullable.group({
    query: [''],
    type: ['' as '' | NotificationType],
    region: [''],
    status: ['' as '' | NotificationStatus],
    severity: ['' as '' | NotificationSeverity],
  });

  readonly createForm = this.fb.nonNullable.group({
    type: ['FIRE' as NotificationType, Validators.required],
    severity: ['HIGH' as NotificationSeverity, Validators.required],
    region: ['', [Validators.required, Validators.maxLength(120)]],
    location: ['', [Validators.required, Validators.maxLength(120)]],
    cooperativeName: ['', [Validators.required, Validators.maxLength(200)]],
    message: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  readonly filteredAlerts = computed(() => {
    const all = this.alerts();
    const { query, type, region, status, severity } = this.filterForm.getRawValue();
    const q = query.trim().toLowerCase();

    return all.filter((a) => {
      const matchesQuery =
        !q ||
        (a.cooperativeName || '').toLowerCase().includes(q) ||
        (a.location || '').toLowerCase().includes(q) ||
        (a.region || '').toLowerCase().includes(q) ||
        (a.message || '').toLowerCase().includes(q);

      const matchesType = !type || a.type === type;
      const matchesRegion = !region.trim() || (a.region || '').toLowerCase().includes(region.trim().toLowerCase());
      const matchesStatus = !status || a.status === status;
      const matchesSeverity = !severity || a.severity === severity;

      return matchesQuery && matchesType && matchesRegion && matchesStatus && matchesSeverity;
    });
  });

  readonly criticalCount = computed(() => this.filteredAlerts().filter((a) => a.severity === 'CRITICAL').length);
  readonly highCount = computed(() => this.filteredAlerts().filter((a) => a.severity === 'HIGH').length);
  readonly mediumCount = computed(() => this.filteredAlerts().filter((a) => a.severity === 'MEDIUM').length);
  readonly resolvedCount = computed(() => this.filteredAlerts().filter((a) => a.status === 'RESOLVED').length);

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.api.getAll().subscribe({
      next: (data) => {
        this.alerts.set(data ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Failed to load alerts.');
        this.loading.set(false);
      },
    });
  }

  openCreateModal(): void {
    this.createForm.reset({
      type: 'FIRE',
      severity: 'HIGH',
      region: '',
      location: '',
      cooperativeName: '',
      message: '',
    });
    this.showCreateModal.set(true);
  }

  closeCreateModal(): void {
    this.showCreateModal.set(false);
  }

  createAlert(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    this.api.create(this.createForm.getRawValue()).subscribe({
      next: (created) => {
        this.alerts.set([created, ...this.alerts()]);
        this.saving.set(false);
        this.showCreateModal.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Failed to create alert.');
        this.saving.set(false);
      },
    });
  }

  openView(alert: NotificationDto): void {
    this.selectedAlert.set(alert);
    this.showViewModal.set(true);
  }

  closeView(): void {
    this.showViewModal.set(false);
    this.selectedAlert.set(null);
  }

  updateStatus(alert: NotificationDto, status: NotificationStatus): void {
    this.errorMessage.set(null);
    this.api.updateStatus(alert.id, status).subscribe({
      next: (updated) => {
        const next = this.alerts().map((a) => (a.id === updated.id ? updated : a));
        this.alerts.set(next);
        if (this.selectedAlert() && this.selectedAlert()!.id === updated.id) {
          this.selectedAlert.set(updated);
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Failed to update alert status.');
      },
    });
  }

  severityClass(sev: NotificationSeverity): string {
    switch (sev) {
      case 'CRITICAL':
        return 'critical';
      case 'HIGH':
        return 'high';
      case 'MEDIUM':
        return 'medium';
      case 'LOW':
      default:
        return 'low';
    }
  }

  statusClass(status: NotificationStatus): string {
    switch (status) {
      case 'NEW':
        return 'new';
      case 'IN_PROGRESS':
        return 'progress';
      case 'RESOLVED':
      default:
        return 'resolved';
    }
  }

  typeLabel(type: NotificationType): string {
    switch (type) {
      case 'FIRE':
        return '🔥 Fire';
      case 'FLOOD':
        return '🌊 Flood';
      case 'PEST':
        return '🐛 Pest';
      case 'DISEASE':
        return '🦠 Disease';
      case 'OTHER':
      default:
        return '⚠️ Other';
    }
  }

  formatTime(iso: string): string {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }
}
