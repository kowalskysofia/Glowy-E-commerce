
import { useForm } from "react-hook-form";
import "./AdminProducts.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import ProductRow from "../../../components/product-row/ProductRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const URL_BASE = "https://6ab2fc8c5b9b60f39d353034.mockapi.io";

export default function AdminProducts() {
    const nameInpuRef = useRef(null);

    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isValid }
    } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        obtenerProductos();
    }, []);

    async function obtenerProductos() {
        try {
            setLoading(true);
            setLoadError(false);

            const response = await axios.get(`${URL_BASE}/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    }

    async function envioFormulario(data) {
        try {
            const product = data;

            if (editingProductId) {
                await axios.put(
                    `${URL_BASE}/products/${editingProductId}`,
                    product
                );

                await Swal.fire({
                    icon: "success",
                    title: "Producto actualizado",
                    text: `El producto ${product.name} ha sido actualizado exitosamente.`
                });
            } else {
                product.createdAt = new Date().toISOString();

                await axios.post(
                    `${URL_BASE}/products`,
                    product
                );

                await Swal.fire({
                    icon: "success",
                    title: "Producto creado",
                    text: `El producto ${product.name} ha sido creado exitosamente.`
                });
            }

            setEditingProductId(null);
            reset();

            nameInpuRef.current?.focus();

            await obtenerProductos();
        } catch (error) {
            console.error("Error al guardar el producto:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: editingProductId
                    ? "Hubo un problema al actualizar el producto."
                    : "Hubo un problema al crear el producto."
            });
        }
    }


    async function handleDelete(id) {
        const productoAEliminar = products.find(
            (producto) => producto.id === id
        );

        try {
            const result = await Swal.fire({
                icon: "warning",
                title: "¿Estás seguro?",
                text: "No podrás revertir esto.",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            if (!result.isConfirmed) {
                return;
            }

            await axios.delete(`${URL_BASE}/products/${id}`);

            await Swal.fire({
                icon: "success",
                title: "Producto eliminado",
                text: `El producto ${productoAEliminar?.name ?? ""} se ha eliminado correctamente.`
            });

            await obtenerProductos();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al eliminar el producto."
            });
        }
    }


    function handleEdit(id) {
        const productoEditar = products.find(
            (producto) => producto.id === id
        );

        if (productoEditar) {
            setValue("image", productoEditar.image);
            setValue("name", productoEditar.name);
            setValue("brand", productoEditar.brand);
            setValue("category", productoEditar.category);
            setValue("price", productoEditar.price, {
                shouldValidate: true
            });
            setValue("stock", productoEditar.stock, {
                shouldValidate: true
            });
            setValue("description", productoEditar.description);

            setEditingProductId(productoEditar.id);
        }
    }

   
    async function cancelarEdicion() {
        const result = await Swal.fire({
            icon: "warning",
            title: "¿Salir de la edición?",
            text: "Los cambios que hayas hecho se perderán.",
            showCancelButton: true,
            confirmButtonText: "Sí, salir",
            cancelButtonText: "No, continuar editando"
        });

        if (!result.isConfirmed) {
            return;
        }

        setEditingProductId(null);
        reset();
    }

    return (
        <main className="add-product-page">
            <section className="form-header">
                <h2>
                    {editingProductId
                        ? "Editar Producto"
                        : "Agregar Producto"}
                </h2>

                <p>
                    {editingProductId
                        ? "Modificá la información del producto seleccionado."
                        : "Completá la información para incorporar un nuevo producto al catálogo."}
                </p>
            </section>

            <div className="admin-products-layout">


                {/* FORMULARIO */}
                <section className="add-product-container">
                    <form
                        className="product-form"
                        onSubmit={handleSubmit(envioFormulario)}
                        noValidate
                    >
                        <div className="form-group">
                            <label htmlFor="name">
                                Nombre del producto
                            </label>

                            <input
                                ref={nameInpuRef}
                                {...register("name", {
                                    required: "El nombre del producto es obligatorio",
                                    minLength: {
                                        value: 4,
                                        message: "El nombre del producto debe tener al menos 4 caracteres"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "El nombre del producto no puede tener más de 50 caracteres"
                                    }
                                })}
                                type="text"
                                id="name"
                                placeholder="Ej. Niacinamide 10% + Zinc 1%"
                            />

                            {errors.name && (
                                <p className="error">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Marca</label>

                            <input
                                {...register("brand", {
                                    required: "La marca es obligatoria",
                                    minLength: {
                                        value: 2,
                                        message: "La marca debe tener al menos 2 caracteres"
                                    }
                                })}
                                type="text"
                                id="brand"
                                placeholder="Ej. The Ordinary"
                            />

                            {errors.brand && (
                                <p className="error">
                                    {errors.brand.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Categoría</label>

                            <select
                                id="category"
                                {...register("category", {
                                    required: "Debés seleccionar una categoría"
                                })}
                            >

                                <option value="">Seleccionar categoría</option>
                                <option value="Hidratación">Hidratación</option>
                                <option value="Sérum">Sérum</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Protección solar">Protección Solar</option>
                                <option value="Mascarillas">Mascarillas</option>

                            </select>

                            {errors.category && (
                                <p className="error">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Precio</label>

                            <div className="price-input">
                                <span>$</span>

                                <input
                                    {...register("price", {
                                        required: "El precio es obligatorio",
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "El precio debe ser mayor a 0"
                                        }
                                    })}
                                    type="number"
                                    id="price"
                                    placeholder="100"
                                    min="1"
                                />
                            </div>

                            {errors.price && (
                                <p className="error">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>

                            <input
                                {...register("stock", {
                                    required: "El stock es obligatorio",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: "El stock no puede ser negativo"
                                    },
                                    validate: (value) =>
                                        Number.isInteger(value) ||
                                        "El stock debe ser un número entero"
                                })}
                                type="number"
                                id="stock"
                                placeholder="100"
                                min="0"
                                step="1"
                            />

                            {errors.stock && (
                                <p className="error">
                                    {errors.stock.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>

                            <textarea
                                {...register("description", {
                                    required: "La descripción es obligatoria"
                                })}
                                id="description"
                                rows={5}
                                placeholder="Descripción del producto"
                            />

                            {errors.description && (
                                <p className="error">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">
                                Imagen del producto
                            </label>

                            <input
                                type="url"
                                {...register("image", {
                                    required: "La imagen del producto es obligatoria",
                                    pattern: {
                                        value: /^https?:\/\/.+/i,
                                        message: "Ingresá una URL válida que comience con http:// o https://"
                                    }
                                })}
                                id="image"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />

                            {errors.image && (
                                <p className="error">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        <div className="button-container">
                            <button
                                disabled={!isValid}
                                type="submit"
                                className="btn-gnl btn-main"
                            >
                                {editingProductId
                                    ? "Editar Producto"
                                    : "Agregar Producto"}
                            </button>

                            {editingProductId && (
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={cancelarEdicion}
                                    title="Cancelar edición"
                                    aria-label="Cancelar edición"
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            )}
                        </div>
                    </form>
                </section>

               
               
                <section className="products-list">
                    <h2>Productos</h2>

                    {loading ? (
                        <p className="product-message">
                            Cargando productos...
                        </p>
                    ) : loadError ? (
                        <div>
                            <p className="error">
                                No se pudieron cargar los productos. Intentá nuevamente.
                            </p>

                            <button
                                type="button"
                                onClick={obtenerProductos}
                                className="btn-gnl"
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : products.length === 0 ? (
                        <p>No hay productos registrados.</p>
                    ) : (
                        <div className="products-table-wrapper">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Fecha de ingreso</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((producto) => (
                                        <ProductRow
                                            key={producto.id}
                                            prod={producto}
                                            handleEdit={handleEdit}
                                            handleDelete={handleDelete}
                                            editingProductId={editingProductId}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
