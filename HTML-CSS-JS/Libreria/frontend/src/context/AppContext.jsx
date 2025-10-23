import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import { librosPorTema } from '../Data/LibrosPorTema';

// Placeholder SVG para imágenes
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSIxNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREREREREIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkxpYnJvPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5TaW4gSW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Estado del catálogo
  const [catalogo, setCatalogo] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado de autenticación
  const [usuario, setUsuario] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);

  // Cargar catálogo inicial desde la API
  useEffect(() => {
    const cargarLibros = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Intentar cargar desde la API
        const response = await apiService.getBooks();
        if (response.success && response.data) {
          console.log('📚 Datos recibidos de la API:', response.data);
          // Mapear los datos de la API al formato esperado
          const librosMapeados = response.data.map(libro => ({
            id: libro.id,
            titulo: libro.title,
            autor: libro.author?.name || 'Autor desconocido',
            descripcion: libro.description || '',
            precio: libro.price,
            stock: libro.stock || 0,
            isbn: libro.isbn,
            publishedYear: libro.publishedYear,
            tema: libro.tema || 'literatura',
            imageUrl: libro.imageUrl || PLACEHOLDER_IMAGE
          }));
          
          console.log('📖 Libros mapeados:', librosMapeados);
          setCatalogo(librosMapeados);
          setLibrosFiltrados(librosMapeados);
        } else {
          // Fallback a datos locales si la API falla
          cargarDatosLocales();
        }
      } catch (err) {
        console.warn('Error cargando desde API, usando datos locales:', err);
        cargarDatosLocales();
      } finally {
        setLoading(false);
      }
    };

    const cargarDatosLocales = () => {
      const todosLosLibros = [];
      Object.keys(librosPorTema).forEach(tema => {
        librosPorTema[tema].forEach(libro => {
          todosLosLibros.push({
            ...libro,
            id: Math.random().toString(36).substr(2, 9), // ID temporal
            tema: tema,
            stock: Math.floor(Math.random() * 20) + 1, // Stock aleatorio
            isbn: Math.random().toString().substr(2, 13) // ISBN temporal
          });
        });
      });
      setCatalogo(todosLosLibros);
      setLibrosFiltrados(todosLosLibros);
    };

    cargarLibros();
  }, []);

  // Función de búsqueda
  const buscarLibros = (termino) => {
    setBusqueda(termino);
    if (!termino.trim()) {
      setLibrosFiltrados(catalogo);
      return;
    }
    
    const filtrados = catalogo.filter(libro => 
      libro.titulo.toLowerCase().includes(termino.toLowerCase()) ||
      libro.autor.toLowerCase().includes(termino.toLowerCase()) ||
      libro.descripcion.toLowerCase().includes(termino.toLowerCase())
    );
    setLibrosFiltrados(filtrados);
  };

  // Filtrar por categoría
  const filtrarPorCategoria = (categoria) => {
    setCategoriaFiltro(categoria);
    if (categoria === 'todas') {
      setLibrosFiltrados(catalogo);
    } else {
      const filtrados = catalogo.filter(libro => libro.tema === categoria);
      setLibrosFiltrados(filtrados);
    }
  };

  // Aplicar filtros combinados
  const aplicarFiltros = () => {
    console.log('🔍 Aplicando filtros - Catálogo:', catalogo.length, 'libros');
    console.log('🔍 Filtro de categoría:', categoriaFiltro);
    console.log('🔍 Búsqueda:', busqueda);
    
    let filtrados = catalogo;
    
    // Filtrar por categoría
    if (categoriaFiltro !== 'todas') {
      filtrados = filtrados.filter(libro => libro.tema === categoriaFiltro);
      console.log('🔍 Después de filtrar por categoría:', filtrados.length, 'libros');
    }
    
    // Filtrar por búsqueda
    if (busqueda.trim()) {
      filtrados = filtrados.filter(libro => 
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
      console.log('🔍 Después de filtrar por búsqueda:', filtrados.length, 'libros');
    }
    
    console.log('🔍 Libros filtrados finales:', filtrados);
    setLibrosFiltrados(filtrados);
  };

  // Aplicar filtros con un catálogo específico (para casos asíncronos)
  const aplicarFiltrosConCatalogo = (catalogoEspecifico) => {
    console.log('🔍 Aplicando filtros con catálogo específico:', catalogoEspecifico.length, 'libros');
    console.log('🔍 Filtro de categoría:', categoriaFiltro);
    console.log('🔍 Búsqueda:', busqueda);
    
    let filtrados = catalogoEspecifico;
    
    // Filtrar por categoría
    if (categoriaFiltro !== 'todas') {
      filtrados = filtrados.filter(libro => libro.tema === categoriaFiltro);
      console.log('🔍 Después de filtrar por categoría:', filtrados.length, 'libros');
    }
    
    // Filtrar por búsqueda
    if (busqueda.trim()) {
      filtrados = filtrados.filter(libro => 
        libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
        libro.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
      console.log('🔍 Después de filtrar por búsqueda:', filtrados.length, 'libros');
    }
    
    console.log('🔍 Libros filtrados finales:', filtrados);
    setLibrosFiltrados(filtrados);
  };

  // Funciones de administración (solo para admin)
  const agregarLibro = async (nuevoLibro) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mapear datos al formato de la API
      const libroData = {
        title: nuevoLibro.titulo,
        description: nuevoLibro.descripcion,
        price: nuevoLibro.precio,
        stock: nuevoLibro.stock || 0,
        isbn: nuevoLibro.isbn,
        publishedYear: nuevoLibro.publishedYear,
        imageUrl: nuevoLibro.imagen ? nuevoLibro.imageUrl : (nuevoLibro.imageUrl || PLACEHOLDER_IMAGE),
        tema: nuevoLibro.tema,
        authorId: parseInt(nuevoLibro.authorId) // Usar el authorId del formulario
      };
      
      console.log('📝 Datos del libro a enviar:', libroData);
      const response = await apiService.createBook(libroData);
      console.log('📡 Respuesta del servidor:', response);
      
      if (response.success) {
        // Mapear respuesta de la API
        const libroMapeado = {
          id: response.data.id,
          titulo: response.data.title,
          autor: response.data.author?.name || 'Autor desconocido',
          descripcion: response.data.description || '',
          precio: response.data.price,
          stock: response.data.stock || 0,
          isbn: response.data.isbn,
          publishedYear: response.data.publishedYear,
          tema: response.data.tema || 'literatura',
          imageUrl: response.data.imageUrl || PLACEHOLDER_IMAGE
        };
        
        setCatalogo(prev => {
          const nuevoCatalogo = [...prev, libroMapeado];
          console.log('📚 Catálogo actualizado:', nuevoCatalogo);
          
          // Aplicar filtros inmediatamente con el nuevo catálogo
          setTimeout(() => {
            console.log('🔄 Aplicando filtros con nuevo catálogo...');
            aplicarFiltrosConCatalogo(nuevoCatalogo);
          }, 0);
          
          return nuevoCatalogo;
        });
        
        console.log('✅ Libro agregado exitosamente:', libroMapeado);
      }
    } catch (err) {
      setError('Error al agregar el libro: ' + err.message);
      console.error('Error agregando libro:', err);
    } finally {
      setLoading(false);
    }
  };

  const editarLibro = async (id, datosActualizados) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mapear datos al formato de la API
      const libroData = {
        title: datosActualizados.titulo,
        description: datosActualizados.descripcion,
        price: datosActualizados.precio,
        stock: datosActualizados.stock,
        isbn: datosActualizados.isbn,
        publishedYear: datosActualizados.publishedYear,
        imageUrl: datosActualizados.imageUrl,
        tema: datosActualizados.tema,
        authorId: parseInt(datosActualizados.authorId) // Usar el authorId del formulario
      };
      
      const response = await apiService.updateBook(id, libroData);
      
      if (response.success) {
        // Mapear respuesta de la API
        const libroMapeado = {
          id: response.data.id,
          titulo: response.data.title,
          autor: response.data.author?.name || 'Autor desconocido',
          descripcion: response.data.description || '',
          precio: response.data.price,
          stock: response.data.stock || 0,
          isbn: response.data.isbn,
          publishedYear: response.data.publishedYear,
          tema: response.data.tema || 'literatura',
          imageUrl: datosActualizados.hasNewImage ? datosActualizados.imageUrl : (response.data.imageUrl || PLACEHOLDER_IMAGE)
        };
        
        setCatalogo(prev => 
          prev.map(libro => 
            libro.id === id ? libroMapeado : libro
          )
        );
        aplicarFiltros();
      }
    } catch (err) {
      setError('Error al editar el libro: ' + err.message);
      console.error('Error editando libro:', err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarLibro = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.deleteBook(id);
      
      if (response.success) {
        setCatalogo(prev => prev.filter(libro => libro.id !== id));
        aplicarFiltros();
      }
    } catch (err) {
      setError('Error al eliminar el libro: ' + err.message);
      console.error('Error eliminando libro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Login/Logout
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.login(credentials.email, credentials.password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        setUsuario(response.user);
        setEsAdmin(response.user.role === 'ADMIN');
        
        return { success: true, user: response.user };
      }
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
      console.error('Error en login:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null);
    setEsAdmin(false);
  };

  // Verificar si hay usuario logueado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUsuario(user);
        setEsAdmin(user.role === 'ADMIN');
      } catch (err) {
        console.error('Error parsing user data:', err);
        logout();
      }
    }
  }, []);

  const value = {
    // Estado
    catalogo,
    librosFiltrados,
    busqueda,
    categoriaFiltro,
    loading,
    error,
    usuario,
    esAdmin,
    
    // Funciones
    buscarLibros,
    filtrarPorCategoria,
    aplicarFiltros,
    agregarLibro,
    editarLibro,
    eliminarLibro,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
