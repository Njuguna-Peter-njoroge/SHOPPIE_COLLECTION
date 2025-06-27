import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../Services/auth-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-header">
        <h1>{{ isLoginMode ? 'Welcome Back' : 'Create Account' }}</h1>
        <h2>{{ isLoginMode ? 'Sign in to continue' : 'Sign up to get started' }}</h2>
      </div>

      <form (ngSubmit)="onSubmit()">
        <div class="form-group" *ngIf="!isLoginMode">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            [(ngModel)]="name"
            name="name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="email"
            name="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            name="password"
            required
          />
        </div>

        <div class="form-group" *ngIf="!isLoginMode">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            [(ngModel)]="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>

        <button type="submit" class="submit-btn" [disabled]="isLoading">
          <span *ngIf="isLoading" class="spinner"></span>
          <span>{{ isLoginMode ? 'Sign In' : 'Sign Up' }}</span>
        </button>
      </form>

      <div class="auth-message" *ngIf="authMessage" [class.success]="false">
        {{ authMessage }}
      </div>

      <div class="auth-footer">
        {{ isLoginMode ? "Don't have an account?" : 'Already have an account?' }}
        <button class="toggle-btn" (click)="toggleMode()">
          {{ isLoginMode ? 'Sign up' : 'Sign in' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  authMessage = '';

  email = '';
  password = '';
  name = '';
  confirmPassword = '';

  private loadingSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Set registration mode if we're on the register route
    if (this.router.url === '/register') {
      this.isLoginMode = false;
    }

    // Subscribe to loading state
    this.loadingSubscription = this.authService.loading$.subscribe(
      loading => {
        this.isLoading = loading;
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.authMessage = '';

    if (this.isLoginMode) {
      this.authService.handleLogin({
        email: this.email,
        password: this.password
      });
    } else {
      this.authService.handleRegister({
        name: this.name,
        email: this.email,
        password: this.password
      });
    }
  }

  private validateForm(): boolean {
    if (!this.email || !this.password) {
      this.authMessage = 'Please fill in all required fields';
      this.toastr.error(this.authMessage);
      return false;
    }

    if (!this.isLoginMode) {
      if (!this.name) {
        this.authMessage = 'Please enter your name';
        this.toastr.error(this.authMessage);
        return false;
      }
      if (this.password.length < 8) {
        this.authMessage = 'Password must be at least 8 characters long';
        this.toastr.error(this.authMessage);
        return false;
      }
      if (this.password !== this.confirmPassword) {
        this.authMessage = 'Passwords do not match';
        this.toastr.error(this.authMessage);
        return false;
      }
    }

    return true;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authMessage = '';
    this.resetForm();
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.confirmPassword = '';
  }
}
