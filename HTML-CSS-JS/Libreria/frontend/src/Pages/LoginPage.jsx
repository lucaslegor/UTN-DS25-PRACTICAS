import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApp } from "../context/AppContext";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useApp();

  // Esquema de validación directo en el componente
  const loginSchema = yup.object({
    email: yup
      .string()
      .email('Debe ser un email válido')
      .required('El email es requerido'),
    password: yup
      .string()
      .min(1, 'La contraseña es requerida')
      .required('La contraseña es requerida')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setError("");

    const result = await login(data);
    
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Error al iniciar sesión");
    }
  };

  return (
    <main className="main-content">
      <section className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </div>
          <div className="form-group">
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
          <button 
            type="submit" 
            className="login-btn" 
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
          <div className="register-link">
            <p>¿No tienes una cuenta? <Link to="/signup">Regístrate aquí</Link></p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;