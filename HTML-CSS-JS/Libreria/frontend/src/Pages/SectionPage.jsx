import { useParams } from "react-router-dom"
import BookCard from "../Components/BookCard"
import { useApp } from "../context/AppContext"
import "../styles/SectionPage.css"

const SectionPage = () => {
  const { tema } = useParams()
  const { catalogo, loading, error } = useApp()

  // Filtrar libros por tema desde el catálogo dinámico
  const libros = catalogo.filter(libro => libro.tema === tema)

  const getSectionDescription = (tema) => {
    const descriptions = {
      literatura: "Descubre nuestra selección de los mejores libros de literatura, desde clásicos hasta las últimas novedades.",
      ciencia: "Explora el fascinante mundo de la ciencia con nuestra selección de libros sobre física, astronomía, biología y más.",
      historia: "Sumérgete en la historia con nuestra colección de libros que narran los eventos más importantes de la humanidad.",
      deportes: "Explora nuestra colección de libros sobre deportes, desde biografías de grandes atletas hasta guías técnicas."
    }
    return descriptions[tema] || "Descubre nuestra selección de libros."
  }

  if (loading) {
    return (
      <main className="main-content">
        <section className="section-container">
          <div className="section-header">
            <h2>{tema.charAt(0).toUpperCase() + tema.slice(1)}</h2>
            <p>{getSectionDescription(tema)}</p>
          </div>
          <div className="loading-message">
            <p>Cargando libros...</p>
          </div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="main-content">
        <section className="section-container">
          <div className="section-header">
            <h2>{tema.charAt(0).toUpperCase() + tema.slice(1)}</h2>
            <p>{getSectionDescription(tema)}</p>
          </div>
          <div className="error-message">
            <p>Error al cargar los libros: {error}</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="main-content">
      <section className="section-container">
        <div className="section-header">
          <h2>{tema.charAt(0).toUpperCase() + tema.slice(1)}</h2>
          <p>{getSectionDescription(tema)}</p>
        </div>
        {libros.length === 0 ? (
          <div className="no-books-message">
            <p>No hay libros disponibles en esta categoría.</p>
          </div>
        ) : (
          <div className="books-grid">
            {libros.map((libro, index) => (
              <BookCard key={libro.id || index} libro={libro} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default SectionPage