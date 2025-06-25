// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';
//
//
// interface LoginRequest {
//   email: string;
//   password: string;
// }
//
// interface RegisterRequest {
//   name: string;
//   email: string;
//   password: string;
// }
//
// @Injectable({


//   providedIn: 'root'
// })export class AuthService {
//   private apiUrl = 'http://localhost:3000/auth/login';
//
//
//   constructor(private http: HttpClient) {}
//
//   login(data: LoginRequest): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, data);
//   }
//
//   register(data: RegisterRequest): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }
//
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {environment} from '../../environments/environment';
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      role: 'ADMIN' | 'CUSTOMER';
      id: string;
      name: string;
      email: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`; // Use environment variable

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.storeAuthData(response.data);
        }
      }),
      catchError(this.handleError)
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  private storeAuthData(authData: AuthResponse['data']) {
    if (!authData) return;

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    console.error('AuthService error:', error);
    return throwError(() => new Error(errorMessage));
  }

  // Utility methods
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): { role: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
