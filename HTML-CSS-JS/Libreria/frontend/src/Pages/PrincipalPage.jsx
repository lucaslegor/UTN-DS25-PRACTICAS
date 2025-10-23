import { Link } from "react-router-dom"
import { useApp } from "../context/AppContext"
import { librosPorTema } from "../Data/LibrosPorTema"
import BookCard from "../Components/BookCard"
import SearchBar from "../Components/SearchBar"
import "../styles/PrincipalPage.css"

const PrincipalPage = () => {
  const { librosFiltrados, busqueda } = useApp();

  const secciones = [
    {
      nombre: "Literatura",
      ruta: "/section/literatura",
      imagen: librosPorTema.literatura[0].imagen,
      titulo: librosPorTema.literatura[0].titulo,
      autor: librosPorTema.literatura[0].autor,
      descripcion: "Los mejores libros de literatura, Clickea para más información"
    },
    {
      nombre: "Ciencia",
      ruta: "/section/ciencia",
      imagen: librosPorTema.ciencia[0].imagen,
      titulo: librosPorTema.ciencia[0].titulo,
      autor: librosPorTema.ciencia[0].autor,
      descripcion: "Los mejores libros de Ciencia, Clickea para más información"
    },
    {
      nombre: "Historia",
      ruta: "/section/historia",
      imagen: librosPorTema.historia[0].imagen,
      titulo: librosPorTema.historia[0].titulo,
      autor: librosPorTema.historia[0].autor,
      descripcion: "Los mejores libros de Historia, Clickea para más información"
    },
    {
      nombre: "Deportes",
      ruta: "/section/deportes",
      imagen: librosPorTema.deportes[0].imagen,
      titulo: librosPorTema.deportes[0].titulo,
      autor: librosPorTema.deportes[0].autor,
      descripcion: "Los mejores libros de deportes, Clickea para más información"
    }
  ];

  // Si hay búsqueda activa, mostrar resultados
  if (busqueda) {
    return (
      <main className="main-content">
        <div className="container">
          <div className="search-results-header">
            <h2>Resultados de búsqueda para "{busqueda}"</h2>
            <p>{librosFiltrados.length} libros encontrados</p>
          </div>
          
          {librosFiltrados.length > 0 ? (
            <div className="row">
              {librosFiltrados.slice(0, 8).map((libro) => (
                <div key={libro.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <BookCard libro={libro} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>No se encontraron resultados</h3>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          )}
          
          {librosFiltrados.length > 8 && (
            <div className="text-center mt-4">
              <Link to="/catalog" className="btn btn-primary btn-lg">
                Ver todos los resultados ({librosFiltrados.length})
              </Link>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <section className="section-temas">
        <h2 className="section-title">Nuestras Secciones</h2>
        <div className="section-libros-container">
          {secciones.map((seccion, index) => (
            <div key={index} className="section-libros-container-item">
              <Link to={seccion.ruta}>
                <h3>{seccion.nombre}</h3>
                <img 
                  src={seccion.imagen} 
                  alt={`Libro destacado de ${seccion.nombre}`} 
                  className="section-libros-container-item-img"
                />
                <h4>{seccion.titulo} <br /> {seccion.autor}</h4>
                <p>{seccion.descripcion}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PrincipalPage;