import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      role: 'ADMIN' | 'CUSTOMER';
    };
  };
}



@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private  readonly registerUrl  =  'http://localhost:3000/auth/register'
  private  readonly loginUrl  =  'http://localhost:3000/auth/login'


  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  register(userData: RegisterRequest): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(this.registerUrl, userData);
  }

  login(data: LoginRequest): Observable< LoginResponse>{
    return this.http.post<LoginResponse>(this.loginUrl, data);
  }

  handleLogin(data: LoginRequest): void {
    this.loadingSubject.next(true);
    this.login(data).subscribe({
      next: (res: LoginResponse) =>{
        if(!res.success || !res.data){
          this.toastr.error(res.message || 'Login failed');
          this.loadingSubject.next(false);
          return;
        }
        const { token, user} = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        this.toastr.success('Login successful',' Welcome');

        // check user roles and redirect accordingly
        if(user.role === 'ADMIN'){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/home']);
        }
        this.loadingSubject.next(false);
      },
      error: (err) =>{
        const errMessage = err.error?.message || 'Login failed';
        this.toastr.error(errMessage, 'Login Error');
        this.loadingSubject.next(false);
      },
    });
  }

  // handle register
  handleRegister(userData: RegisterRequest): void {
    this.loadingSubject.next(true);
    this.register(userData).subscribe({
      next: (res: RegisterResponse) => {
        this.toastr.success(
          res.message || 'Registration successful',
          'Success'
        );
        this.loadingSubject.next(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Registration failed';
        this.toastr.error(errorMessage, 'Registration Error');
        this.loadingSubject.next(false);
      },
    });
  }
}
