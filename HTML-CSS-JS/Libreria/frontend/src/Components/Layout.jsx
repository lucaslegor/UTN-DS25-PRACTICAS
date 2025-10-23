import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Layout.css";

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};