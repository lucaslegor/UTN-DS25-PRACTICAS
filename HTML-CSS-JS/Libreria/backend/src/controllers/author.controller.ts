import { Request, Response, NextFunction } from 'express';
import * as authorService from '../services/author.service';

export async function getAllAuthors(req: Request, res: Response, next: NextFunction) {
  try {
    const authors = await authorService.getAllAuthors();
    res.json({ success: true, data: authors });
  } catch (error) {
    next(error);
  }
}

export async function getAuthorById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.getAuthorById(id);
    res.json({ success: true, data: author });
  } catch (error) {
    next(error);
  }
}

export async function createAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Autor creado exitosamente', 
      data: author 
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.updateAuthor(id, req.body);
    res.json({ 
      success: true, 
      message: 'Autor actualizado exitosamente', 
      data: author 
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    await authorService.deleteAuthor(id);
    res.json({ 
      success: true, 
      message: 'Autor eliminado exitosamente' 
    });
  } catch (error) {
    next(error);
  }
}
