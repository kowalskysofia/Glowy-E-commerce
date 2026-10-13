
import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUser, getUsers } from "../../services/users.service";
import "./Register.css";

function Register() {
    const [mensaje, setMensaje] = useState("");
    const [errorGeneral, setErrorGeneral] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        setMensaje("");
        setErrorGeneral("");

        try {
            const usuarios = await getUsers();

            const emailExiste = usuarios.some(
                (usuario) =>
                    usuario.email?.trim().toLowerCase() ===
                    data.email.trim().toLowerCase()
            );
            if (emailExiste) {
              setErrorGeneral(
                 "Ya existe una cuenta registrada con ese email."
                );
      return;
            }

            await createUser({
                fullname: data.fullname.trim(),
                email: data.email.trim().toLowerCase(),
                password: data.password,
                birth: data.birth,
                country: data.country
            });
            setMensaje("¡Registro exitoso! Ya podés iniciar sesión.");
            reset();
            setMostrarPassword(false);
            setMostrarConfirmacion(false);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setErrorGeneral(
                "No se pudo completar el registro. Intentá nuevamente."
            );
        }
    };

    return (
        <section className="register">
            <form
                className="register-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <div className="info-text">
                    <h2>Crear una cuenta</h2>
                    <p>Completá tus datos para registrarte.</p>
                </div>

                <label htmlFor="fullname">Nombre completo</label>
                <input
                    type="text"
                    id="fullname"
                    placeholder="Ej. Ana Pérez"
                    {...register("fullname", {
                        required: "El nombre es obligatorio.",
                        minLength: {
                            value: 4,
                            message: "El nombre debe tener al menos 4 caracteres."
                        },
                        maxLength: {
                            value: 50,
                            message: "El nombre no puede superar los 50 caracteres."
                        },
                        pattern: {
                            value: /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñÜü]+)*$/,
                            message: "Ingresá un nombre válido, sin números ni símbolos."
                        }
                    })}
                />
                {errors.fullname && (
                    <p className="error">{errors.fullname.message}</p>
                )}

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
                        autoComplete="new-password"
                        {...register("password", {
                            required: "La contraseña es obligatoria.",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres."
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                message: "Incluí al menos una mayúscula, una minúscula y un número."
                            }
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
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                        <FontAwesomeIcon
                            icon={mostrarPassword ? faEyeSlash : faEye}
                        />
                    </button>
                </div>
                {errors.password && (
                    <p className="error">{errors.password.message}</p>
                )}

                <label htmlFor="confirmPassword">Repetir contraseña</label>
                <div className="password-input-container">
                    <input
                        type={mostrarConfirmacion ? "text" : "password"}
                        id="confirmPassword"
                        autoComplete="new-password"
                        {...register("confirmPassword", {
                            required: "Tenés que repetir la contraseña.",
                            validate: (value) =>
                                value === getValues("password") ||
                                "Las contraseñas no coinciden."
                        })}
                    />
                    <button
                        className="password-toggle"
                        type="button"
                        aria-label={
                            mostrarConfirmacion
                                ? "Ocultar confirmación de contraseña"
                                : "Mostrar confirmación de contraseña"
                        }
                        onClick={() =>
                            setMostrarConfirmacion(!mostrarConfirmacion)
                        }
                    >
                        <FontAwesomeIcon
                            icon={mostrarConfirmacion ? faEyeSlash : faEye}
                        />
                    </button>
                </div>

                {errors.confirmPassword && (
                    <p className="error">
                        {errors.confirmPassword.message}
                    </p>
                )}

                <label htmlFor="birth">Fecha de nacimiento</label>
                <input
                    type="date"
                    id="birth"
                    max={new Date().toLocaleDateString("en-CA")}
                    {...register("birth", {
                        required: "La fecha de nacimiento es obligatoria.",
                        validate: (value) =>
                            value <= new Date().toLocaleDateString("en-CA") ||
                            "La fecha de nacimiento no puede ser futura."
                    })}
                />
                {errors.birth && (
                    <p className="error">{errors.birth.message}</p>
                )}

                <label htmlFor="country">País</label>
                <select
                    id="country"
                    defaultValue=""
                    {...register("country", {
                        required: "Seleccioná tu país."
                    })}
                >
                    <option value="" disabled>
                        Seleccioná tu país
                    </option>
                    <option value="AR">Argentina</option>
                    <option value="BO">Bolivia</option>
                    <option value="BR">Brasil</option>
                    <option value="CL">Chile</option>
                    <option value="CO">Colombia</option>
                    <option value="PY">Paraguay</option>
                    <option value="UY">Uruguay</option>
                </select>
                {errors.country && (
                    <p className="error">{errors.country.message}</p>
                )}

                {errorGeneral && (
                    <p className="error" role="alert">{errorGeneral}</p>
                )}
                {mensaje && (
                    <p className="success-message" role="status">{mensaje}</p>
                )}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "Crear cuenta"}
                </button>
                <p className="sesion-text">
                    ¿Ya tenés una cuenta?{" "}
                    <Link to="/login">Iniciá sesión</Link>
                </p>
            </form>
        </section>
    );
}

export default Register;
