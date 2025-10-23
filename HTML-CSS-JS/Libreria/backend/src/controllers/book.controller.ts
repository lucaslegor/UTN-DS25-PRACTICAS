import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookService.getAllBooks();
    res.json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
}

export async function getPublicBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookService.getPublicBooks();
    res.json({ 
      success: true, 
      data: books,
      message: 'Libros públicos obtenidos exitosamente'
    });
  } catch (error) {
    next(error);
  }
}

export async function getBookById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.getBookById(id);
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('📝 Datos recibidos en createBook:', req.body);
    const book = await bookService.createBook(req.body);
    console.log('📚 Libro creado exitosamente:', book);
    res.status(201).json({ 
      success: true, 
      message: 'Libro creado exitosamente', 
      data: book 
    });
  } catch (error) {
    console.error('❌ Error en createBook:', error);
    next(error);
  }
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.updateBook(id, req.body);
    res.json({ 
      success: true, 
      message: 'Libro actualizado exitosamente', 
      data: book 
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    await bookService.deleteBook(id);
    res.json({ 
      success: true, 
      message: 'Libro eliminado exitosamente' 
    });
  } catch (error) {
    next(error);
  }
}

export async function searchBooks(req: Request, res: Response, next: NextFunction) {
  try {
    const { q, category } = req.query;
    const books = await bookService.searchBooks(q as string, category as string);
    res.json({ 
      success: true, 
      data: books,
      total: books.length,
      query: q,
      category: category || 'all'
    });
  } catch (error) {
    next(error);
  }
}

export async function getBooksByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { category } = req.params;
    const books = await bookService.getBooksByCategory(category);
    res.json({ 
      success: true, 
      data: books,
      total: books.length,
      category 
    });
  } catch (error) {
    next(error);
  }
}