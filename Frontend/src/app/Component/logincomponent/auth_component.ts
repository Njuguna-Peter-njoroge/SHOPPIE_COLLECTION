import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest, RegisterRequest } from '../../services/authservice';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css'],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginComponent {
  isLogin = true;
  email = '';
  password = '';
  confirmPassword = '';
  authMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleView(): void {
    this.isLogin = !this.isLogin;
    // Reset form fields and message when toggling
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.authMessage = '';
  }

  async onSubmit(): Promise<void> {
    if (this.isLogin) {
      try {
        const loginRequest: LoginRequest = {
          email: this.email,
          password: this.password
        };
        await this.authService.login(loginRequest);
        this.authMessage = 'Login successful!';
        await this.router.navigate(['/dashboard']);
      } catch (error) {
        this.authMessage = 'Login failed. Please try again.';
      }
    } else {
      if (this.password !== this.confirmPassword) {
        this.authMessage = 'Passwords do not match!';
        return;
      }

      try {
        const registerRequest: RegisterRequest = {
          email: this.email,
          password: this.password,
          name: ''
        };
        await this.authService.register(registerRequest);
        this.authMessage = 'Registration successful! Please log in.';
        this.isLogin = true;
      } catch (error) {
        this.authMessage = 'Registration failed. Please try again.';
      }
    }
  }
}
