import { User } from '../generated/prisma';

// Usuario sin password (para respuestas)
export type UserData = Omit<User, 'password'>;

// Request para crear usuario
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role?: 'USER' | 'ADMIN';
}

// Request para actualizar usuario
export interface UpdateUserRequest {
  email?: string;
  password?: string;
  name?: string;
  role?: 'USER' | 'ADMIN';
}