import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../../services/users.service";
import "./AdminUsers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FORMULARIO_VACIO = {
    fullname: "",
    email: "",
    password: "",
    birth: "",
    country: ""
};

const PAISES = [
    { value: "AR", label: "Argentina" },
    { value: "BO", label: "Bolivia" },
    { value: "BR", label: "Brasil" },
    { value: "CL", label: "Chile" },
    { value: "CO", label: "Colombia" },
    { value: "PY", label: "Paraguay" },
    { value: "UY", label: "Uruguay" }
];

function prepararFecha(fecha) {
    if (!fecha) return "";
    const fechaConvertida =
        typeof fecha === "number"
            ? new Date(
                fecha < 1000000000000
                    ? fecha * 1000
                    : fecha
            )
            : new Date(fecha);

    if (Number.isNaN(fechaConvertida.getTime())) return "";
    return fechaConvertida.toISOString().slice(0, 10);
}

function mostrarFecha(fecha) {
    const fechaPreparada = prepararFecha(fecha);

    if (!fechaPreparada) return "-";

    const [anio, mes, dia] = fechaPreparada.split("-");
    return `${dia}/${mes}/${anio}`;
}
function obtenerNombrePais(codigo) {
    const paisEncontrado = PAISES.find(
        (pais) => pais.value === codigo
    );

    return paisEncontrado?.label || codigo || "-";
}
function AdminUsers() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [formulario, setFormulario] = useState({ ...FORMULARIO_VACIO });
    const [guardando, setGuardando] = useState(false);
    const [eliminandoId, setEliminandoId] = useState(null);

    async function obtenerUsuarios() {
        setCargando(true);
        setError("");

        try {
            const usuariosObtenidos = await getUsers();
            setUsuarios(usuariosObtenidos);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError(
                "No se pudieron cargar los usuarios. Verificá la conexión e intentá nuevamente."
            );
        } finally {
            setCargando(false);
        }
    }
    useEffect(() => {
        obtenerUsuarios();
    }, []);

    function abrirFormularioNuevo() {
        setUsuarioEditando(null);
        setFormulario({ ...FORMULARIO_VACIO });
        setMostrarFormulario(true);
        setMensaje("");
        setError("");
    }
    function abrirFormularioEdicion(usuario) {
        setUsuarioEditando(usuario);

        setFormulario({
            fullname: usuario.fullname || usuario.name || "",
            email: usuario.email || "",
            password: "",
            birth: prepararFecha(usuario.birth || usuario.birthDate),
            country: usuario.country || usuario.province || ""
        });

        setMostrarFormulario(true);
        setMensaje("");
        setError("");
    }

    function cerrarFormulario() {
        setMostrarFormulario(false);
        setUsuarioEditando(null);
        setFormulario({ ...FORMULARIO_VACIO });
        setError("");
    }
    function manejarCambio(event) {
        const { name, value } = event.target;

        setFormulario((formularioAnterior) => ({
            ...formularioAnterior,
            [name]: value
        }));

        setError("");
        setMensaje("");
    }

    async function guardarUsuario(event) {
        event.preventDefault();

        if (guardando) return;

        setError("");
        setMensaje("");

        const nombre = formulario.fullname.trim();
        const email = formulario.email.trim().toLowerCase();
        const password = formulario.password;
        const fechaNacimiento = formulario.birth;

        // Validar nombre
        if (!nombre) {
            setError("El nombre completo es obligatorio.");
            return;
        }
        if (nombre.length < 4 || nombre.length > 50) {
            setError("El nombre debe tener entre 4 y 50 caracteres.");
            return;
        }
        const nombreValido =
            /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü]+(?: [a-zA-ZÁÉÍÓÚáéíóúÑñÜü]+)*$/;

        if (!nombreValido.test(nombre)) {
            setError("Ingresá un nombre válido, sin números ni símbolos.");
            return;
        }
        // Validar correo electronico
        if (!email) {
            setError("El correo electrónico es obligatorio.");
            return;
        }
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(email)) {
            setError("Ingresá un correo electrónico válido.");
            return;
        }
        const emailDuplicado = usuarios.some(
            (usuario) =>
                usuario.email?.trim().toLowerCase() === email &&
                String(usuario.id) !== String(usuarioEditando?.id ?? "")
        );
        if (emailDuplicado) {
            setError(
                "Ya existe un usuario registrado con ese correo electrónico."
            );
            return;
        }

        // Validar contraseña
        if (!usuarioEditando && !password) {
            setError("La contraseña es obligatoria.");
            return;
        }
        if (password && password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }
        if (
            password &&
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)
        ) {
            setError(
                "Incluí al menos una mayúscula, una minúscula y un número en la contraseña."
            );
            return;
        }

        // Validar fecha de nacimiento
        if (!fechaNacimiento) {
            setError("La fecha de nacimiento es obligatoria.");
            return;
        }
        const hoy = new Date();
        const fechaActual =
            `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
        if (fechaNacimiento > fechaActual) {
            setError("La fecha de nacimiento no puede ser futura.");
            return;
        }

        // Validar pais
        if (!formulario.country) {
            setError("Seleccioná el país del usuario.");
            return;
        }

        // Confirmar edicion
        if (usuarioEditando) {
            const confirmacion = await Swal.fire({
                title: "¿Guardar los cambios?",
                text: `Vas a actualizar los datos de ${usuarioEditando.fullname ||
                    usuarioEditando.name ||
                    usuarioEditando.email
                    }.`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, guardar cambios",
                cancelButtonText: "Seguir editando",
                confirmButtonColor: "#c58ca5",
                cancelButtonColor: "#777",
                reverseButtons: true
            });

            if (!confirmacion.isConfirmed) return;
        }

        const estabaEditando = Boolean(usuarioEditando);
        const datosUsuario = {
            fullname: nombre,
            email,
            birth: fechaNacimiento,
            country: formulario.country
        };
        if (!usuarioEditando || password) {
            datosUsuario.password = password;
        } else if (usuarioEditando.password !== undefined) {
            datosUsuario.password = usuarioEditando.password;
        }
        setGuardando(true);

        try {
            if (usuarioEditando) {
                const usuarioActualizado = await updateUser(
                    usuarioEditando.id,
                    datosUsuario
                );
                setUsuarios((usuariosActuales) =>
                    usuariosActuales.map((usuario) =>
                        String(usuario.id) === String(usuarioEditando.id)
                            ? { ...usuario, ...usuarioActualizado }
                            : usuario
                    )
                );
                setMensaje("El usuario se actualizó correctamente.");
            } else {
                const usuarioCreado = await createUser(datosUsuario);
                setUsuarios((usuariosActuales) => [
                    ...usuariosActuales,
                    usuarioCreado
                ]);
                setMensaje("El usuario se creó correctamente.");
            }
            setMostrarFormulario(false);
            setUsuarioEditando(null);
            setFormulario({ ...FORMULARIO_VACIO });
        } catch (error) {
            console.error("Error al guardar el usuario:", error);

            setError(
                estabaEditando
                    ? "No se pudo actualizar el usuario. Intentá nuevamente."
                    : "No se pudo crear el usuario. Intentá nuevamente."
            );
        } finally {
            setGuardando(false);
        }
    }

    async function manejarEliminar(usuario) {
        if (eliminandoId !== null) return;

        const resultado = await Swal.fire({
            title: "¿Eliminar este usuario?",
            text: `Se eliminará el registro de ${usuario.fullname || usuario.name || usuario.email
                }. Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#777",
            reverseButtons: true
        });
        if (!resultado.isConfirmed) return;

        setError("");
        setMensaje("");
        setEliminandoId(usuario.id);

        try {
            await deleteUser(usuario.id);

            setUsuarios((usuariosActuales) =>
                usuariosActuales.filter(
                    (usuarioActual) =>
                        String(usuarioActual.id) !== String(usuario.id)
                )
            );
            if (
                usuarioEditando &&
                String(usuarioEditando.id) === String(usuario.id)
            ) {
                cerrarFormulario();
            }

            setMensaje("El usuario se eliminó correctamente.");
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            setError("No se pudo eliminar el usuario. Intentá nuevamente.");
        } finally {
            setEliminandoId(null);
        }
    }

    if (cargando) {
        return (
            <section className="admin-users-layout">
                <h1>Usuarios registrados</h1>
                <p role="status">Cargando usuarios...</p>
            </section>
        );
    }

    return (
        <section className="admin-users-layout">
            <h1>Usuarios registrados</h1>

            <p>
                Total de usuarios registrados:{" "}
                <strong>{usuarios.length}</strong>
            </p>

            {mensaje && (
                <p className="admin-users-message" role="status">
                    {mensaje}
                </p>
            )}

            {error && (
                <p className="error" role="alert">
                    {error}
                </p>
            )}

            {error.includes("No se pudieron cargar") && (
                <button type="button" onClick={obtenerUsuarios}>
                    Reintentar carga
                </button>
            )}

            {!mostrarFormulario && (
                <button
                    type="button"
                    className="admin-users-add-button"
                    onClick={abrirFormularioNuevo}
                >
                    Agregar usuario
                </button>
            )}

            {mostrarFormulario && (
                <form
                    className="admin-users-form"
                    onSubmit={guardarUsuario}
                    noValidate
                >
                    <h2>
                        {usuarioEditando
                            ? "Editar usuario"
                            : "Agregar usuario"}
                    </h2>

                    <label htmlFor="fullname">Nombre completo</label>
                    <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={formulario.fullname}
                        onChange={manejarCambio}
                        required
                        minLength={4}
                        maxLength={50}
                        autoComplete="name"
                    />

                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formulario.email}
                        onChange={manejarCambio}
                        required
                        autoComplete="email"
                    />

                    <label htmlFor="password">
                        Contraseña
                        {usuarioEditando
                            ? " (dejala vacía para conservar la actual)"
                            : ""}
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formulario.password}
                        onChange={manejarCambio}
                        required={!usuarioEditando}
                        minLength={8}
                        autoComplete="new-password"
                    />

                    <label htmlFor="birth">Fecha de nacimiento</label>
                    <input
                        id="birth"
                        name="birth"
                        type="date"
                        value={formulario.birth}
                        onChange={manejarCambio}
                        max={new Date().toLocaleDateString("en-CA")}
                        required
                    />

                    <label htmlFor="country">País</label>
                    <select
                        id="country"
                        name="country"
                        value={formulario.country}
                        onChange={manejarCambio}
                        required
                    >
                        <option value="">Seleccioná un país</option>

                        {formulario.country &&
                            !PAISES.some(
                                (pais) => pais.value === formulario.country
                            ) && (
                                <option value={formulario.country}>
                                    {formulario.country}
                                </option>
                            )}
                        {PAISES.map((pais) => (
                            <option key={pais.value} value={pais.value}>
                                {pais.label}
                            </option>
                        ))}
                    </select>
                    <div className="admin-users-form-actions">
                        <button type="submit" disabled={guardando}>
                            {guardando
                                ? "Guardando..."
                                : usuarioEditando
                                    ? "Guardar cambios"
                                    : "Crear usuario"}
                        </button>
                        <button
                            type="button"
                            onClick={cerrarFormulario}
                            disabled={guardando}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {usuarios.length === 0 ? (
                <p>Todavía no hay usuarios registrados.</p>
            ) : (
                <div className="users-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre completo</th>
                                <th>Correo electrónico</th>
                                <th>Fecha de nacimiento</th>
                                <th>País</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>
                                        {usuario.fullname || usuario.name || "-"}
                                    </td>
                                    <td>{usuario.email || "-"}</td>
                                    <td>
                                        {mostrarFecha(
                                            usuario.birth || usuario.birthDate
                                        )}
                                    </td>
                                    <td>
                                        {obtenerNombrePais(
                                            usuario.country || usuario.province
                                        )}
                                    </td>
                                    <td className="admin-users-actions">
                                        <div className="product-actions">
                                            <button
                                                className="btn-action btn-edit"
                                                type="button"
                                                title="Editar usuario"
                                                aria-label={`Editar ${usuario.fullname ||
                                                    usuario.name ||
                                                    usuario.email
                                                    }`}
                                                onClick={() =>
                                                    abrirFormularioEdicion(usuario)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                className="btn-action btn-delete"
                                                type="button"
                                                title="Eliminar usuario"
                                                aria-label={`Eliminar ${usuario.fullname ||
                                                    usuario.name ||
                                                    usuario.email
                                                    }`}
                                                onClick={() =>
                                                    manejarEliminar(usuario)
                                                }
                                                disabled={
                                                    String(eliminandoId) ===
                                                    String(usuario.id)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default AdminUsers;
