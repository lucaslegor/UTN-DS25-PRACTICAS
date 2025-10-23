import React from 'react';
import { useApp } from '../context/AppContext';
import BookCard from '../Components/BookCard';
import SearchBar from '../Components/SearchBar';
import '../styles/CatalogPage.css';

const CatalogPage = () => {
  const { librosFiltrados, busqueda, categoriaFiltro } = useApp();

  const getResultadosTexto = () => {
    if (busqueda && categoriaFiltro !== 'todas') {
      return `${librosFiltrados.length} resultados para "${busqueda}" en ${categoriaFiltro}`;
    } else if (busqueda) {
      return `${librosFiltrados.length} resultados para "${busqueda}"`;
    } else if (categoriaFiltro !== 'todas') {
      return `${librosFiltrados.length} libros en ${categoriaFiltro}`;
    }
    return `${librosFiltrados.length} libros disponibles`;
  };

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="catalog-header">
              <h1 className="catalog-title">Catálogo de Libros</h1>
              <p className="catalog-subtitle">
                Descubre nuestra amplia colección de libros
              </p>
            </div>
            
            <SearchBar 
              placeholder="Buscar por título, autor o descripción..."
              showCategoryFilter={true}
            />
            
            <div className="results-info">
              <p className="results-text">{getResultadosTexto()}</p>
            </div>
          </div>
        </div>
        
        <div className="row">
          {librosFiltrados.length > 0 ? (
            librosFiltrados.map((libro) => (
              <div key={libro.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <BookCard libro={libro} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="no-results">
                <div className="no-results-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda o cambia la categoría</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
