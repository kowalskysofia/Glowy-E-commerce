
import { Link } from "react-router";
import "./ProductCard.css";
import useOrder from "../../context/useOrder";

function ProductCard({ product }) {
    const { addItemToOrder } = useOrder();
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <span className="product-category">
                    {product.category}
                </span>
                <div className="product-price">
                    ${Number(product.price).toLocaleString("es-AR")}
                </div>
            </div>
            <div className="product-actions">
                <button
                    type="button"
                    className="btn-gnl"
                    onClick={() => addItemToOrder(product)}
                >
                    Comprar
                </button>
                <Link
                    to={`/product-detail/${product.id}`}
                    className="btn-view-more"
                >
                    Ver más
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;


