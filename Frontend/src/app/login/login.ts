import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Navbar} from '../Component/navbar/navbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, Navbar],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isLoginMode: boolean = true;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  authMessage: string = '';
  isLoading: boolean = false;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }

  private clearForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.name = '';
    this.authMessage = '';
  }

  onSubmit() {
    this.authMessage = '';
    this.isLoading = true;

    // Simple validation
    if (!this.email || !this.password) {
      this.authMessage = 'Please fill in all fields';
      this.isLoading = false;
      return;
    }

    if (!this.isLoginMode && this.password !== this.confirmPassword) {
      this.authMessage = 'Passwords do not match';
      this.isLoading = false;
      return;
    }

    // Demo authentication - replace with real API call
    setTimeout(() => {
      this.authMessage = this.isLoginMode ? 'Login successful!' : 'Account created!';
      this.isLoading = false;

      // Redirect to home after successful auth
      this.router.navigate(['/home']);
    }, 1500);
  }

  constructor(private router: Router) {}
}
