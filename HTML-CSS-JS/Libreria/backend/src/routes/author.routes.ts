import { Router } from 'express';
import * as authorController from '../controllers/author.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/authors - Listar todos los autores (PÚBLICO)
router.get(
  '/',
  authorController.getAllAuthors
);

// GET /api/authors/:id - Obtener un autor por ID (PÚBLICO)
router.get(
  '/:id',
  authorController.getAuthorById
);

// POST /api/authors - Crear un nuevo autor (PRIVADO - ADMIN)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  authorController.createAuthor
);

// PUT /api/authors/:id - Actualizar un autor (PRIVADO - ADMIN)
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  authorController.updateAuthor
);

// DELETE /api/authors/:id - Eliminar un autor (PRIVADO - ADMIN)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  authorController.deleteAuthor
);

export const authorRoutes = router;
