import { Link } from "react-router-dom"
import { useApp } from "../context/AppContext"
import SearchBar from "./SearchBar"
import logo from "../assets/Images/logo.png"
import "../styles/Header.css"

export default function Header() {
  const { usuario, esAdmin, logout, login } = useApp();

  return (
    <header className="header-container">
      <div className="header-top">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <div className="logo-box">
              <img src={logo || "/placeholder.svg"} alt="Logo" />
            </div>
            <h1 className="header-title">Librería Lucas</h1>
          </Link>
        </div>
        <div className="header-right">
          {usuario ? (
            <div className="user-menu">
              <span className="welcome-text">Hola, {usuario.name}</span>
              {esAdmin && (
                <Link to="/admin/books" className="admin-link">
                  <i className="fas fa-cog"></i> Admin
                </Link>
              )}
              <button onClick={logout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i> Salir
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/signup" className="signup-button">Registro</Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="header-search">
        <div className="container">
          <SearchBar placeholder="Buscar libros..." showCategoryFilter={false} />
        </div>
      </div>
      
      <div className="header-bottom">
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="header-nav-list-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="header-nav-list-item">
              <Link to="/catalog">Catálogo</Link>
            </li>
            <li className="header-nav-list-item">
              <Link to="/section/literatura">Literatura</Link>
            </li>
            <li className="header-nav-list-item">
              <Link to="/section/ciencia">Ciencia</Link>
            </li>
            <li className="header-nav-list-item">
              <Link to="/section/historia">Historia</Link>
            </li>
            <li className="header-nav-list-item">
              <Link to="/section/deportes">Deportes</Link>
            </li>
            <li className="header-nav-list-item">
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}