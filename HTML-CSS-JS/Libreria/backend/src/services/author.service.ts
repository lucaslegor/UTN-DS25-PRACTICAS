import prisma from '../config/prisma';
import { Author } from '../generated/prisma';

export async function getAllAuthors(): Promise<Author[]> {
  return prisma.author.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function getAuthorById(id: number): Promise<Author> {
  const author = await prisma.author.findUnique({ 
    where: { id } 
  });
  
  if (!author) {
    const error = new Error('Autor no encontrado') as any;
    error.statusCode = 404;
    throw error;
  }
  
  return author;
}

export async function createAuthor(data: { 
  name: string; 
  biography?: string; 
  nationality?: string; 
  birthDate?: Date; 
}): Promise<Author> {
  return prisma.author.create({ 
    data 
  });
}

export async function updateAuthor(id: number, data: Partial<Author>): Promise<Author> {
  try {
    return await prisma.author.update({ 
      where: { id }, 
      data 
    });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Autor no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

export async function deleteAuthor(id: number): Promise<void> {
  try {
    await prisma.author.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Autor no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}
