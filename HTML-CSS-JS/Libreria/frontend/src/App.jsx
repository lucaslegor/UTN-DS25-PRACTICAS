import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import Layout from "./Components/Layout"
import PrincipalPage from "./Pages/PrincipalPage"
import SectionPage from "./Pages/SectionPage"
import ContactPage from "./Pages/ContactPage"
import CatalogPage from "./Pages/CatalogPage"
import AdminBooksPage from "./Pages/AdminBooksPage"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Ruta principal - siempre muestra la página principal */}
          <Route path="/" element={
            <Layout>
              <PrincipalPage />
            </Layout>
          } />
          
          {/* Rutas sin Layout */}
          <Route path="/login" element={
            <Layout>
              <LoginPage />
            </Layout>
          } />
          <Route path="/signup" element={
            <Layout>
              <SignupPage />
            </Layout>
          } />
          
          {/* Rutas con Layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/home" element={<PrincipalPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/section/:tema" element={<SectionPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin/books" element={<AdminBooksPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App