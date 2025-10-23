import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth.types';

export async function login(data: LoginRequest): Promise<LoginResponse['data']> {
  // 1. Buscar usuario
  const user = await prisma.user.findUnique({
    where: { email: data.email }   
  });
  if (!user) {
    const error = new Error('Credenciales inválidas') as any;
    error.statusCode = 401;
    throw error;   
  }

  // 2. Verificar password
  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) {
    const error = new Error('Credenciales inválidas') as any;
    error.statusCode = 401;
    throw error;   
  }

  // 3. Generar JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role       
    },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });

  // 4. Retornar sin password
  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword, 
    token   
  };
}

export async function register(data: RegisterRequest): Promise<LoginResponse['data']> {
  // 1. Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });
  
  if (existingUser) {
    const error = new Error('El usuario ya existe con este email') as any;
    error.statusCode = 409;
    throw error;
  }

  // 2. Hashear password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  // 3. Crear usuario
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: `${data.nombre} ${data.apellido}`,
      password: hashedPassword,
      role: 'USER' // Por defecto todos los usuarios son USER
    }
  });

  // 4. Generar JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role       
    },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  // 5. Retornar sin password
  const { password: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword, 
    token   
  };
}