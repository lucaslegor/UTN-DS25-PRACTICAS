import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth.types';

export async function login(req: Request<LoginRequest>, res: Response<LoginResponse>, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.json({
      success: true,
      token: result.token,
      user: result.user
    });   
  } catch (error) { 
    next(error); 
  }
}

export async function register(req: Request<RegisterRequest>, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token: result.token,
      user: result.user
    });   
  } catch (error) { 
    next(error); 
  }
}