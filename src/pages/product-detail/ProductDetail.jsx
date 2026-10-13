
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router";
import { getProductById } from "../../services/product.service";
import useOrder from "../../context/useOrder";

function ProductDetail() {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const { addItemToOrder } = useOrder();
    const { id } = useParams();

    useEffect(() => {
        async function obtenerElProducto() {
            try {
                setLoading(true);
                setHasError(false);

                const product = await getProductById(id);
                setProducto(product);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        }
        obtenerElProducto();
    }, [id]);
    if (loading) {
        return <p className="product-message">Cargando producto...</p>;
    }
    if (hasError || !producto) {
        return (
            <p className="product-message">
                 No pudimos encontrar el producto. Intentá nuevamente más tarde.
            </p>
        );
    }
        const precio = Number(producto.price);
        const precioValido = Number.isFinite(precio) && precio >= 0;
        const formatoPrecio = (valor) =>
        valor.toLocaleString("es-AR", {
            maximumFractionDigits: 2,
        });
    return (
        <main className="product-page">
            <section className="product-detail">
                <div className="product-image">
                    <img src={producto.image} alt={producto.name} />
                </div>

                <section className="product-info">
                        {producto.brand && (
                        <span className="subtitle">{producto.brand}</span>
                    )}

                    <h1>{producto.name}</h1>

                    {producto.category && (
                        <span className="category">{producto.category}</span>
                    )}

                    <div className="price">
                        {precioValido
                            ? `$${formatoPrecio(precio)} `
                            : "Precio no disponible"}
                    </div>

                    {precioValido && (
                        <div className="quotas">
                            3 cuotas sin interés de $
                            {formatoPrecio(
                                Math.round((precio / 3) * 100) / 100
                            )}
                        </div>
                    )}

                    <p className="product-summary">
                        {producto.description || "Descubrí este producto de Glowy."}
                    </p>

                    <div className="product-purchase">
                        <button
                            type="button"
                            className="btn-gnl"
                            onClick={() => addItemToOrder(producto)}
                        >
                            <i className="bi bi-bag" /> Agregar al carrito
                        </button>
                    </div>

                    <div className="product-features">
                        <div className="feature">
                            <i className="bi bi-truck" />
                            <div className="feature-text">
                                <span>Envíos</span>
                                <p>Consultá las opciones de envío disponibles para tu pedido.</p>
                            </div>
                        </div>

                        <div className="feature">
                            <i className="bi bi-heart" />
                            <div className="feature-text">
                                <span>Tu rutina, a tu manera</span>
                                <p>Elegí los productos que mejor acompañen tus necesidades.</p>
                            </div>
                        </div>

                        <div className="feature">
                            <i className="bi bi-credit-card" />
                            <div className="feature-text">
                                <span>Medios de pago</span>
                                <p>Conocé las opciones disponibles al realizar tu compra.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            {/* <section className="product-description">
                <div className="description-content">
                    <span className="description-eyebrow">EL UNIVERSO GLOWY</span>
                    <h2>Un momento para vos</h2>
                    <p className="description-text">
                        En Glowy creemos que el cuidado de la piel va más allá de lo
                        superficial. Es encontrar un momento para vos, conocer lo que tu
                        piel necesita y disfrutar de una rutina que se adapte a tu día a día.
                    </p>
                    <h3 className="description-subtitle">
                        Cuidarte puede ser simple
                    </h3>

                    <ul className="description-list">
                        <li>Elegí productos según las necesidades de tu piel.</li>
                        <li>Construí una rutina que se adapte a tu estilo de vida.</li>
                        <li>Convertí tu cuidado diario en un momento de bienestar.</li>
                    </ul>

                    <p className="description-text">
                        Cada piel es diferente. Descubrí tus favoritos y encontrá tu propia
                        forma de sentirte bien en tu piel.
                    </p>
                </div>

                <div className="description-image">
                    <img
                        src="/assets/images/carrusel/product-detail.jfif"
                        alt="Productos de cuidado facial en una composición de estilo natural"
                    />
                </div>
            </section> */}
        </main>
    );
}

export default ProductDetail;
