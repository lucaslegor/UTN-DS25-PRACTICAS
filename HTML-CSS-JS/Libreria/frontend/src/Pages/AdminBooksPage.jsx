import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import BookForm from '../Components/BookForm';
import BookCard from '../Components/BookCard';
import SearchBar from '../Components/SearchBar';
import '../styles/AdminBooksPage.css';

const AdminBooksPage = () => {
  const { librosFiltrados, esAdmin, agregarLibro, editarLibro, eliminarLibro } = useApp();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(null);

  // Si no es admin, mostrar mensaje de acceso denegado
  if (!esAdmin) {
    return (
      <div className="admin-access-denied">
        <div className="container">
          <div className="access-denied-content">
            <i className="fas fa-lock"></i>
            <h2>Acceso Restringido</h2>
            <p>Esta página es solo para administradores</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAgregarLibro = (nuevoLibro) => {
    agregarLibro(nuevoLibro);
    setMostrarFormulario(false);
  };

  const handleEditarLibro = (libroActualizado) => {
    editarLibro(libroEditando.id, libroActualizado);
    setLibroEditando(null);
  };

  const handleEliminarLibro = (libro) => {
    setMostrarConfirmacion(libro);
  };

  const confirmarEliminacion = () => {
    eliminarLibro(mostrarConfirmacion.id);
    setMostrarConfirmacion(null);
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(null);
  };

  const abrirFormularioEdicion = (libro) => {
    setLibroEditando(libro);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setLibroEditando(null);
  };

  return (
    <div className="admin-books-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="admin-header">
              <h1 className="admin-title">Administración de Libros</h1>
              <p className="admin-subtitle">Gestiona el catálogo de libros</p>
            </div>
            
            <div className="admin-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => setMostrarFormulario(true)}
              >
                <i className="fas fa-plus"></i> Agregar Libro
              </button>
            </div>
            
            <SearchBar 
              placeholder="Buscar libros para administrar..."
              showCategoryFilter={true}
            />
          </div>
        </div>
        
        {/* Formulario de libro */}
        {(mostrarFormulario || libroEditando) && (
          <div className="book-form-modal">
            <div className="book-form-container">
              <div className="book-form-header">
                <h3>{libroEditando ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h3>
                <button 
                  className="btn-close"
                  onClick={cerrarFormulario}
                >
                </button>
              </div>
              <BookForm
                libro={libroEditando}
                onSubmit={libroEditando ? handleEditarLibro : handleAgregarLibro}
                onCancel={cerrarFormulario}
              />
            </div>
          </div>
        )}
        
        {/* Lista de libros */}
        <div className="row">
          {librosFiltrados.length > 0 ? (
            librosFiltrados.map((libro) => (
              <div key={libro.id} className="col-lg-4 col-md-6 mb-4">
                <div className="admin-book-card">
                  <BookCard libro={libro} />
                  <div className="admin-actions-card">
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => abrirFormularioEdicion(libro)}
                    >
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminarLibro(libro)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="no-results">
                <div className="no-results-icon">
                  <i className="fas fa-book"></i>
                </div>
                <h3>No hay libros</h3>
                <p>Agrega el primer libro al catálogo</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal de confirmación de eliminación */}
        {mostrarConfirmacion && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <div className="confirmation-header">
                <i className="fas fa-exclamation-triangle"></i>
                <h4>Confirmar Eliminación</h4>
              </div>
              <p>
                ¿Estás seguro de que quieres eliminar el libro 
                <strong> "{mostrarConfirmacion.titulo}"</strong>?
              </p>
              <p className="text-muted">Esta acción no se puede deshacer.</p>
              <div className="confirmation-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={cancelarEliminacion}
                >
                  Cancelar
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={confirmarEliminacion}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooksPage;
