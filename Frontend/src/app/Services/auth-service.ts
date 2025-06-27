import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    access_token: string;
    user: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = `${environment.apiBaseUrl}/auth`;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // 🔐 Register
  private register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/register`, userData);
  }

  // 🔐 Login
  private login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, data);
  }

  handleLogin(data: LoginRequest): void {
    this.loadingSubject.next(true);
    this.login(data).subscribe({
      next: (res: AuthResponse) => {
        if (!res.success || !res.data) {
          this.toastr.error(res.message || 'Login failed');
          this.loadingSubject.next(false);
          return;
        }

        const { access_token, user } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('role', user.role);
        localStorage.setItem('user', JSON.stringify(user));

        this.toastr.success('Login successful', 'Welcome');

        // 🚦 Role-based redirect
        this.router.navigate([user.role === 'ADMIN' ? '/admin-dashboard' : '/home']);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        const errMessage = err.error?.message || 'Login failed';
        this.toastr.error(errMessage, 'Login Error');
        this.loadingSubject.next(false);
      },
    });
  }

  // 👤 Handle Register
  handleRegister(userData: RegisterRequest): void {
    this.loadingSubject.next(true);
    this.register(userData).subscribe({
      next: (res: AuthResponse) => {
        this.toastr.success(res.message || 'Registration successful', 'Success');

        // ✅ After successful registration, redirect to login
        this.router.navigate(['/login']);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Registration failed';
        this.toastr.error(errorMessage, 'Registration Error');
        this.loadingSubject.next(false);
      },
    });
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully');
  }

  // 🧾 Check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🧾 Get role
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // 🧾 Get user data
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) as User : null;
  }
}
