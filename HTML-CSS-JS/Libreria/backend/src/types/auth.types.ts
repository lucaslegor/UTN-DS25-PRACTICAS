import { UserData } from './user.types';

// Request para login
export interface LoginRequest {
  email: string;
  password: string;
}

// Request para registro
export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fechaNacimiento?: string;
  sexo?: string;
  temaFavorito?: string;
}

// Response del login
export interface LoginResponse {
  success: boolean;
  data: {
    user: UserData;
    token: string;
  };
}