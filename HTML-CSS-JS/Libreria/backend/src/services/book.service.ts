import prisma from '../config/prisma';
import { Book } from '../generated/prisma';

export async function getAllBooks(): Promise<Book[]> {
  return prisma.book.findMany({
    include: { 
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { id: 'asc' }
  });
}

export async function getPublicBooks(): Promise<Book[]> {
  return prisma.book.findMany({
    where: {
      stock: { gt: 0 } // Solo libros con stock disponible
    },
    include: { 
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { title: 'asc' }
  });
}

export async function getBookById(id: number): Promise<Book> {
  const book = await prisma.book.findUnique({ 
    where: { id }, 
    include: { 
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    } 
  });
  
  if (!book) {
    const error = new Error('Libro no encontrado') as any;
    error.statusCode = 404;
    throw error;
  }
  
  return book;
}

export async function createBook(data: { 
  title: string; 
  description?: string;
  price: number; 
  stock: number; 
  isbn?: string;
  publishedYear?: number;
  imageUrl?: string;
  tema: string;
  authorId: number; 
}): Promise<Book> {
  // Verificar que el autor existe
  const authorExists = await prisma.author.findUnique({ 
    where: { id: data.authorId } 
  });
  
  if (!authorExists) {
    const error = new Error('El autor no existe') as any;
    error.statusCode = 404;
    throw error;
  }

  // Buscar la categoría por nombre
  const category = await prisma.category.findUnique({
    where: { name: data.tema }
  });

  if (!category) {
    const error = new Error(`La categoría '${data.tema}' no existe`) as any;
    error.statusCode = 404;
    throw error;
  }
  
  // Crear el libro con la conexión a la categoría
  const book = await prisma.book.create({ 
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock,
      isbn: data.isbn,
      publishedYear: data.publishedYear,
      imageUrl: data.imageUrl,
      tema: data.tema,
      authorId: data.authorId,
      categories: {
        create: {
          categoryId: category.id
        }
      }
    },
    include: { 
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    } 
  });

  return book;
}

export async function updateBook(id: number, data: Partial<Book> & { tema?: string }): Promise<Book> {
  if (data.authorId) {
    const authorExists = await prisma.author.findUnique({ 
      where: { id: data.authorId } 
    });
    
    if (!authorExists) {
      const error = new Error('El autor no existe') as any;
      error.statusCode = 404;
      throw error;
    }
  }

  // Si se está actualizando el tema, actualizar la categoría
  if (data.tema) {
    const category = await prisma.category.findUnique({
      where: { name: data.tema }
    });

    if (!category) {
      const error = new Error(`La categoría '${data.tema}' no existe`) as any;
      error.statusCode = 404;
      throw error;
    }

    // Eliminar conexiones existentes y crear nueva
    await prisma.bookCategory.deleteMany({
      where: { bookId: id }
    });

    await prisma.bookCategory.create({
      data: {
        bookId: id,
        categoryId: category.id
      }
    });
  }
  
  try {
    return await prisma.book.update({ 
      where: { id }, 
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        isbn: data.isbn,
        publishedYear: data.publishedYear,
        imageUrl: data.imageUrl,
        tema: data.tema,
        authorId: data.authorId
      },
      include: { 
        author: true,
        categories: {
          include: {
            category: true
          }
        }
      } 
    });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Libro no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

export async function deleteBook(id: number): Promise<void> {
  try {
    await prisma.book.delete({ where: { id } });
  } catch (e: any) {
    if (e.code === 'P2025') {
      const error = new Error('Libro no encontrado') as any;
      error.statusCode = 404;
      throw error;
    }
    throw e;
  }
}

export async function searchBooks(query?: string, category?: string): Promise<Book[]> {
  let whereClause: any = {};

  // Si hay query de búsqueda
  if (query && query.trim()) {
    whereClause.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { author: { name: { contains: query, mode: 'insensitive' } } }
    ];
  }

  // Si hay categoría, buscar por la relación con categorías
  if (category && category !== 'all') {
    whereClause.categories = {
      some: {
        category: {
          name: category
        }
      }
    };
  }

  return prisma.book.findMany({
    where: whereClause,
    include: { 
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { title: 'asc' }
  });
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  return prisma.book.findMany({
    where: { 
      categories: {
        some: {
          category: {
            name: category
          }
        }
      }
    },
    include: { 
      author: true,
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: { title: 'asc' }
  });
}