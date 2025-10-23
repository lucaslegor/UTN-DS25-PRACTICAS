import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../Components/Layout";
import { useApp } from "../context/AppContext";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useApp();

  // Esquema de validación directo en el componente
  const registerSchema = yup.object({
    nombre: yup
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede exceder 50 caracteres')
      .required('El nombre es requerido'),
    apellido: yup
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede exceder 50 caracteres')
      .required('El apellido es requerido'),
    email: yup
      .string()
      .email('Debe ser un email válido')
      .required('El email es requerido'),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      )
      .required('La contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña'),
    fechaNacimiento: yup
      .string()
      .optional(),
    sexo: yup
      .string()
      .oneOf(['masculino', 'femenino', 'otro'], 'Selecciona una opción válida')
      .optional(),
    temaFavorito: yup
      .string()
      .oneOf(['literatura', 'ciencia', 'historia', 'deportes'], 'Selecciona un tema válido')
      .optional()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      email: "",
      password: "",
      confirmPassword: "",
      sexo: "",
      temaFavorito: ""
    }
  });

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      } else {
        setError(result.message || "Error al registrarse");
      }
    } catch (error) {
      setError("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <Layout>
      <main className="main-content">
        <section className="registro-container">
          <h2 className="registro-title">Registro de Usuario</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="registro-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                {...register("nombre")}
                className={errors.nombre ? "error" : ""}
              />
              {errors.nombre && (
                <span className="field-error">{errors.nombre.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                {...register("apellido")}
                className={errors.apellido ? "error" : ""}
              />
              {errors.apellido && (
                <span className="field-error">{errors.apellido.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="fecha-nacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fecha-nacimiento"
                {...register("fechaNacimiento")}
                className={errors.fechaNacimiento ? "error" : ""}
              />
              {errors.fechaNacimiento && (
                <span className="field-error">{errors.fechaNacimiento.message}</span>
              )}
            </div>
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
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Sexo:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="masculino"
                    {...register("sexo")}
                  />
                  Masculino
                </label>
                <label>
                  <input
                    type="radio"
                    value="femenino"
                    {...register("sexo")}
                  />
                  Femenino
                </label>
                <label>
                  <input
                    type="radio"
                    value="otro"
                    {...register("sexo")}
                  />
                  Otro
                </label>
              </div>
              {errors.sexo && (
                <span className="field-error">{errors.sexo.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="tema-favorito">Tema Favorito:</label>
              <select
                id="tema-favorito"
                {...register("temaFavorito")}
                className={errors.temaFavorito ? "error" : ""}
              >
                <option value="">Seleccione un tema</option>
                <option value="literatura">Literatura</option>
                <option value="ciencia">Ciencia</option>
                <option value="historia">Historia</option>
                <option value="deportes">Deportes</option>
              </select>
              {errors.temaFavorito && (
                <span className="field-error">{errors.temaFavorito.message}</span>
              )}
            </div>
            <button 
              type="submit" 
              className="registro-btn" 
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Registrando..." : "Registrarse"}
            </button>
            <div className="login-link">
              <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default SignupPage;