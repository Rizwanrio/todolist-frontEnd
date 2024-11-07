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
  message: string | null = null;

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
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register({ username, email, password }).subscribe({
        next: (res) => {
          console.log('Success Response:', res);
          this.message = 'Registration successful! Please SignIn Now';
          this.registerForm.reset();
        },
        error: (err) => {
          console.log('Success Response:', err);
          this.message =
            err.error.message || 'Registration failed. Please try again.';
        },
      });
    }
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
