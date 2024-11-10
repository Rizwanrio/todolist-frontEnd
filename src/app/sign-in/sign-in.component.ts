import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSignIn() {
    // Implement sign-in logic, including JWT handling, here
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.login(username, password).subscribe({
        next: (token) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          // store token
          this.router.navigate(['/tasks']); // navigate to the tasks page
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = err.message;
        },
      });
    }
  }

  getThecsrfToken() {
    this.authService.fetchCsrfToken();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
