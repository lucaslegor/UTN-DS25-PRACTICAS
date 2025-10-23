import { z } from 'zod';

// Schema para crear libro
export const createBookSchema = z.object({
  title: z
    .string()   
    .min(1, 'El título es requerido')   
    .max(200, 'El título no puede exceder 200 caracteres')   
    .trim(),
  description: z
    .string()
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .optional(),
  price: z
    .number()   
    .positive('El precio debe ser positivo')   
    .max(999999, 'El precio no puede exceder 999,999'),
  stock: z
    .number()   
    .int('El stock debe ser un número entero')   
    .min(0, 'El stock no puede ser negativo')   
    .default(0),
  isbn: z
    .string()
    .regex(/^(?:\d{10}|\d{13})$/, 'El ISBN debe tener 10 o 13 dígitos')
    .optional(),
  publishedYear: z
    .number()
    .int('El año debe ser un número entero')
    .min(1000, 'El año debe ser válido')
    .max(new Date().getFullYear(), 'El año no puede ser futuro')
    .optional(),
  imageUrl: z
    .string()
    .url('URL de imagen inválida')
    .optional(),
  tema: z
    .string()
    .min(1, 'El tema es requerido')
    .max(50, 'El tema no puede exceder 50 caracteres'),
  authorId: z
    .number()   
    .int('ID de autor inválido')   
    .positive('ID de autor debe ser positivo')
  });

  // Schema para actualizar (todos los campos opcionales)
export const updateBookSchema = createBookSchema.partial()