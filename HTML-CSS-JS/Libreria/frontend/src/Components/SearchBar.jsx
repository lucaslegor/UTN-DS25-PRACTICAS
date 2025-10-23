import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/SearchBar.css';

const SearchBar = ({ placeholder = "Buscar libros...", showCategoryFilter = true }) => {
  const { busqueda, categoriaFiltro, buscarLibros, filtrarPorCategoria, aplicarFiltros } = useApp();
  const [localBusqueda, setLocalBusqueda] = useState(busqueda);

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setLocalBusqueda(valor);
    buscarLibros(valor);
  };

  const handleCategoriaChange = (e) => {
    filtrarPorCategoria(e.target.value);
  };

  const limpiarFiltros = () => {
    setLocalBusqueda('');
    buscarLibros('');
    filtrarPorCategoria('todas');
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="input-group">
          <input
            type="text"
            className="form-control search-input"
            placeholder={placeholder}
            value={localBusqueda}
            onChange={handleBusquedaChange}
          />
          <button className="btn btn-outline-secondary" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      
      {showCategoryFilter && (
        <div className="category-filter">
          <select
            className="form-select"
            value={categoriaFiltro}
            onChange={handleCategoriaChange}
          >
            <option value="todas">Todas las categorías</option>
            <option value="literatura">Literatura</option>
            <option value="ciencia">Ciencia</option>
            <option value="historia">Historia</option>
            <option value="deportes">Deportes</option>
          </select>
        </div>
      )}
      
      {(busqueda || categoriaFiltro !== 'todas') && (
        <button 
          className="btn btn-link btn-sm clear-filters"
          onClick={limpiarFiltros}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default SearchBar;
