// import { UserResponse } from '../../Users/interface/User.interface';

export interface AuthResponse {
  user: UserResponse;
  access_token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;

  updatedAt: Date;
  status: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
export interface JwtUser {
  userId: string;
  email: string;
  role: string;
}
