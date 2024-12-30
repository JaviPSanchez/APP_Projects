import { User } from '../../../types/shared.types';

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  message?: string;
  user: Omit<User, 'password'>;
  token?: string;
}

export interface ErrorResponse {
  error: string;
}
