
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

function Login() {
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = (data) => {
        console.log("Datos del inicio de sesión:", {
            email: data.email,
            password: data.password
        });
    };

    return (
        <section className="login">
            <form
                className="login-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <div className="info-text">
                    <h2>Iniciar sesión</h2>
                    <p>Ingresá tus datos para continuar.</p>
                </div>

                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    placeholder="ejemplo@correo.com"
                    {...register("email", {
                        required: "El correo electrónico es obligatorio.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresá un correo electrónico válido."
                        }
                    })}
                />
                {errors.email && (
                    <p className="error">{errors.email.message}</p>
                )}

                <label htmlFor="password">Contraseña</label>
                <div className="password-input-container">
                    <input
                        type={mostrarPassword ? "text" : "password"}
                        id="password"
                        placeholder="Ingresá tu contraseña"
                        {...register("password", {
                            required: "La contraseña es obligatoria."
                        })}
                    />

                    <button
                        className="password-toggle"
                        type="button"
                        aria-label={
                            mostrarPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                        }
                        onClick={() =>
                            setMostrarPassword(!mostrarPassword)
                        }
                    >
                        <FontAwesomeIcon
                            icon={mostrarPassword ? faEyeSlash : faEye}
                        />
                    </button>
                </div>

                {errors.password && (
                    <p className="error">{errors.password.message}</p>
                )}

                <button type="submit" disabled={isSubmitting}>
                    Iniciar sesión
                </button>

                <p className="register-text">
                    ¿Todavía no tenés una cuenta?{" "}
                    <Link to="/register">Registrate</Link>
                </p>
            </form>
        </section>
    );
}

export default Login;
