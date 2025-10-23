import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createUserSchema, updateUserSchema } from '../validations/user.validation';

const router = Router();

// GET /api/users - Listar usuarios (solo ADMIN)
router.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  userController.getAllUsers
);

// GET /api/users/:id - Obtener usuario por ID (solo ADMIN)
router.get(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  userController.getUserById
);

// POST /api/users - Crear usuario (solo ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createUserSchema),
  userController.createUser
);

// PUT /api/users/:id - Actualizar usuario (solo ADMIN)
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateUserSchema),
  userController.updateUser
);

// DELETE /api/users/:id - Eliminar usuario (solo ADMIN)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  userController.deleteUser
);

export const userRoutes = router;