import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    
    // TODO: Implement actual authentication
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}