import "../styles/Footer.css"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <ul className="social-links">
            <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Librería Lucas. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}