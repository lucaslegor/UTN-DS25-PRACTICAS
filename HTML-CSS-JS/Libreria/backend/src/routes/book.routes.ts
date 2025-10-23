import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { validate } from '../middlewares/validation.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';

const router = Router();

// GET /api/books - Listar todos los libros (PÚBLICO)
router.get(
  '/',
  bookController.getAllBooks
);

// GET /api/books/public - Listar libros públicos (sin autenticación)
router.get(
  '/public',
  bookController.getPublicBooks
);

// GET /api/books/:id - Obtener un libro por ID
router.get(
  '/:id',
  authenticate,
  authorize('ADMIN', 'USER'),
  bookController.getBookById
);

// POST /api/books - Crear un nuevo libro
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createBookSchema),
  bookController.createBook
);

// PUT /api/books/:id - Actualizar un libro
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateBookSchema),
  bookController.updateBook
);

// DELETE /api/books/:id - Eliminar un libro (solo ADMIN)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  bookController.deleteBook
);

// GET /api/books/search - Buscar libros
router.get(
  '/search',
  authenticate,
  authorize('ADMIN', 'USER'),
  bookController.searchBooks
);

// GET /api/books/category/:category - Filtrar por categoría
router.get(
  '/category/:category',
  authenticate,
  authorize('ADMIN', 'USER'),
  bookController.getBooksByCategory
);

export const bookRoutes = router;