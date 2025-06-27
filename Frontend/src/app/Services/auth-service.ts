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
  ) { }

  private register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/register`, userData);
  }

  private login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, data);
  }

  handleLogin(data: LoginRequest): void {
    this.loadingSubject.next(true);
    this.login(data).subscribe({
      next: (res: AuthResponse) => {
        console.log('Login response:', res);
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

        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error('Login error:', err);
        const errMessage = err.error?.message || 'Login failed';
        this.toastr.error(errMessage, 'Login Error');
        this.loadingSubject.next(false);
      },
    });
  }

  handleRegister(userData: RegisterRequest): void {
    this.loadingSubject.next(true);
    this.register(userData).subscribe({
      next: (res: AuthResponse) => {
        console.log('Register response:', res);
        this.toastr.success(res.message || 'Registration successful', 'Success');
        this.loadingSubject.next(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
        const errorMessage = err.error?.message || 'Registration failed';
        this.toastr.error(errorMessage, 'Registration Error');
        this.loadingSubject.next(false);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
