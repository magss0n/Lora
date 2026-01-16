import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
print() {
console.log('Button clicked');}
  loading = false;
  loginForm!: FormGroup;
  errorMessage = '';
  submitted = false;
  returnUrl: string = '/';

    // Focus states
  emailFocused = false;
  passFocused = false;
  showPassword = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private route =inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Ensure form is visible on initial load
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }


 onLogin(ev: Event) {
  this.print()
    ev.preventDefault()
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.returnUrl =  response.user.role === 'COOP_AGENT' ? '/cooperative' : '/government';
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.loading = false
          alert('Login failed. Please check your credentials and try again.');
        },
        complete: () => {
          this.loading = false;
        }
     })
    }
  }
  // Form control getters
  get loginEmail() { return this.loginForm.get('email') as FormControl; }
  get loginPassword() { return this.loginForm.get('password') as FormControl; }
  

  

}
