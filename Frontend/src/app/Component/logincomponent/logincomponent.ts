import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService, LoginRequest, RegisterRequest} from '../../services/authservice';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css'],
  imports: [CommonModule, FormsModule
  ],
  providers: [AuthService]
})
export class LoginComponent {
  isLogin = true;
  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  authMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleView() {
    this.isLogin = !this.isLogin;
    this.authMessage = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.name = '';
  }

  onSubmit() {
    this.authMessage = '';

    if (this.isLogin) {
      const loginData: LoginRequest = {
        email: this.email,
        password: this.password
      };
      this.authService.login(loginData).subscribe({
        next: (res) => {
          if (!res.success || !res.data) {
            this.authMessage = res.message || 'Login failed';
            return;
          }

          const { token, user } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('role', user.role);
          this.authMessage = 'Login successful!';

          setTimeout(() => {
            this.router.navigate(user.role === 'ADMIN' ? ['/admin'] : ['/home']);
          }, 1000);
        },
        error: (err) => {
          this.authMessage = err.error?.message || 'Login failed';
        }
      });
    } else {
      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        this.authMessage = 'Please fill in all fields.';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.authMessage = 'Passwords do not match.';
        return;
      }

      const registerData: RegisterRequest = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.authService.register(registerData).subscribe({
        next: (res) => {
          this.authMessage = res.message || 'Registration successful! You can now log in.';
          this.isLogin = true;
        },
        error: (err) => {
          this.authMessage = err.error?.message || 'Registration failed';
        }
      });
    }
  }
}
