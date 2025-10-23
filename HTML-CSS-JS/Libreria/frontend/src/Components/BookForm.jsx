import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiService from '../services/api';
import '../styles/BookForm.css';

// Placeholder SVG para imágenes
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSIxNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREREREREIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkxpYnJvPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TaW4gSW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K';

const BookForm = ({ libro, onSubmit, onCancel }) => {
  const [autores, setAutores] = useState([]);
  const [loadingAutores, setLoadingAutores] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [previewImagen, setPreviewImagen] = useState(null);

  // Cargar autores al montar el componente
  useEffect(() => {
    const cargarAutores = async () => {
      setLoadingAutores(true);
      try {
        const response = await apiService.getAuthors();
        if (response.success && response.data) {
          setAutores(response.data);
        }
      } catch (error) {
        console.error('Error cargando autores:', error);
      } finally {
        setLoadingAutores(false);
      }
    };

    cargarAutores();
  }, []);

  // Manejar selección de imagen
  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagenSeleccionada(file);
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImagen(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Esquema de validación directo en el componente
  const bookSchema = yup.object({
    titulo: yup
      .string()
      .min(1, 'El título es requerido')
      .max(200, 'El título no puede exceder 200 caracteres')
      .required('El título es requerido'),
    authorId: yup
      .number()
      .integer('ID de autor inválido')
      .positive('ID de autor debe ser positivo')
      .required('El autor es requerido'),
    descripcion: yup
      .string()
      .max(1000, 'La descripción no puede exceder 1000 caracteres')
      .optional(),
    precio: yup
      .number()
      .positive('El precio debe ser positivo')
      .integer('El precio debe ser un número entero (sin decimales)')
      .max(999999, 'El precio no puede exceder $999,999')
      .min(1, 'El precio debe ser al menos $1')
      .required('El precio es requerido'),
    stock: yup
      .number()
      .integer('El stock debe ser un número entero')
      .min(0, 'El stock no puede ser negativo')
      .max(999, 'El stock no puede exceder 999')
      .required('El stock es requerido'),
    isbn: yup
      .string()
      .matches(
        /^(?:\d{10}|\d{13})$/,
        'El ISBN debe tener 10 o 13 dígitos'
      )
      .optional(),
    publishedYear: yup
      .number()
      .integer('El año debe ser un número entero')
      .min(1000, 'El año debe ser válido')
      .max(new Date().getFullYear(), 'El año no puede ser futuro')
      .optional(),
    // imageUrl se manejará como archivo, no como URL
    tema: yup
      .string()
      .oneOf(['literatura', 'ciencia', 'historia', 'deportes'], 'Selecciona un tema válido')
      .required('El tema es requerido')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(bookSchema),
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      titulo: '',
      authorId: '',
      descripcion: '',
      precio: '',
      stock: 0,
      isbn: '',
      publishedYear: '',
      tema: 'literatura'
    }
  });

  useEffect(() => {
    if (libro) {
      reset({
        titulo: libro.titulo || '',
        authorId: libro.authorId || '',
        descripcion: libro.descripcion || '',
        precio: libro.precio || '',
        stock: libro.stock || 0,
        isbn: libro.isbn || '',
        publishedYear: libro.publishedYear || '',
        tema: libro.tema || 'literatura'
      });
    }
  }, [libro, reset]);

  const onFormSubmit = (data) => {
    const libroData = {
      ...data,
      precio: parseFloat(data.precio),
      stock: parseInt(data.stock) || 0,
      publishedYear: data.publishedYear ? parseInt(data.publishedYear) : null,
      imagen: imagenSeleccionada, // Incluir el archivo de imagen
      imageUrl: imagenSeleccionada ? previewImagen : (libro?.imageUrl || PLACEHOLDER_IMAGE),
      hasNewImage: !!imagenSeleccionada // Flag para indicar si hay nueva imagen
    };
    
    onSubmit(libroData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="book-form">
      <div className="form-content">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="titulo" className="form-label">
                Título <span className="required">*</span>
              </label>
              <input
                type="text"
                id="titulo"
                {...register("titulo")}
                className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                placeholder="Ingresa el título del libro"
              />
              {errors.titulo && <div className="invalid-feedback">{errors.titulo.message}</div>}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="authorId" className="form-label">
                Autor <span className="required">*</span>
              </label>
              <select
                id="authorId"
                {...register("authorId")}
                className={`form-select ${errors.authorId ? 'is-invalid' : ''}`}
                disabled={loadingAutores}
              >
                <option value="">{loadingAutores ? 'Cargando autores...' : 'Selecciona un autor'}</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.name}
                  </option>
                ))}
              </select>
              {errors.authorId && <div className="invalid-feedback">{errors.authorId.message}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            {...register("descripcion")}
            className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
            placeholder="Ingresa una descripción del libro"
            rows="3"
          />
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="precio" className="form-label">
                Precio <span className="required">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  id="precio"
                  {...register("precio")}
                  className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                  placeholder="0"
                  min="0"
                  step="1"
                />
              </div>
              <div className="form-text">
                Precio en pesos argentinos (sin decimales)
              </div>
              {errors.precio && <div className="invalid-feedback">{errors.precio.message}</div>}
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input
                type="number"
                id="stock"
                {...register("stock")}
                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                placeholder="0"
                min="0"
              />
              {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="publishedYear" className="form-label">Año de Publicación</label>
              <input
                type="number"
                id="publishedYear"
                {...register("publishedYear")}
                className={`form-control ${errors.publishedYear ? 'is-invalid' : ''}`}
                placeholder="2024"
                min="1000"
                max={new Date().getFullYear()}
              />
              {errors.publishedYear && <div className="invalid-feedback">{errors.publishedYear.message}</div>}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="tema" className="form-label">Categoría</label>
              <select
                id="tema"
                {...register("tema")}
                className={`form-select ${errors.tema ? 'is-invalid' : ''}`}
              >
                <option value="literatura">Literatura</option>
                <option value="ciencia">Ciencia</option>
                <option value="historia">Historia</option>
                <option value="deportes">Deportes</option>
              </select>
              {errors.tema && <div className="invalid-feedback">{errors.tema.message}</div>}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input
                type="text"
                id="isbn"
                {...register("isbn")}
                className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                placeholder="978-1234567890"
              />
              {errors.isbn && <div className="invalid-feedback">{errors.isbn.message}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen" className="form-label">Imagen del Libro</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImagenChange}
            className="form-control"
          />
          <div className="form-text">
            Selecciona una imagen para el libro (JPG, PNG, WEBP)
          </div>
          
          {/* Preview de la imagen */}
          {previewImagen && (
            <div className="image-preview mt-3">
              <img 
                src={previewImagen} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  maxHeight: '200px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid #e9ecef'
                }} 
              />
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          <i className="fas fa-save"></i> {isSubmitting ? 'Guardando...' : (libro ? 'Actualizar' : 'Agregar')} Libro
        </button>
      </div>
    </form>
  );
};

export default BookForm;
