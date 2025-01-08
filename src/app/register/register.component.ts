import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  signInForm: FormGroup;
  messageErr: string | null = null;
  signInErr: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });
    this.signInForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register({ username, email, password }).subscribe({
        next: (res) => {
          console.log('Success Response:', res);
          this.messageErr = 'Registration successful! Please SignIn Now';
          this.registerForm.reset();
        },
        error: (err) => {
          console.log('Success Response:', err);
          this.messageErr =
            err.error || 'Registration failed. Please try again.';
        },
      });
    }
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  onSignIn() {
    // Implement sign-in logic, including JWT handling, here
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.login(username, password).subscribe({
        next: (message) => {
          this.messageErr = null;
          // store token
          this.router.navigate(['/tasks']); // navigate to the tasks page
        },
        error: (err) => {
          console.error('Login error:', err);
          this.signInErr = err.message;
        },
      });
    }
  }
}
