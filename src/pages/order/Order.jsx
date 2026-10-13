
import "./Order.css";
import useOrder from "../../context/useOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPlus,
    faMinus
} from "@fortawesome/free-solid-svg-icons";

function Order() {
    const {
        order,
        decreaseItemQuantity,
        removeItemFromOrder,
        addItemToOrder,
        total
    } = useOrder();

    const formatoPrecio = (precio) =>
        Number(precio).toLocaleString("es-AR");

    return (
        <div className="order-container">
            <h1>Mi carrito</h1>
            {order.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </td>

                                <td>{item.name}</td>
                                <td>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-button"
                                            type="button"
                                            aria-label={`Restar una unidad de ${item.name}`}
                                            disabled={item.quantity <= 1}
                                            onClick={() =>
                                                decreaseItemQuantity(item.id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span className="quantity-number">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="quantity-button"
                                            type="button"
                                            aria-label={`Agregar una unidad de ${item.name}`}
                                            disabled={
                                                Number.isFinite(Number(item.stock)) &&
                                                item.quantity >= Number(item.stock)
                                            }
                                            onClick={() => addItemToOrder(item)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </td>

                                <td>${formatoPrecio(item.price)}</td>

                                <td>
                                    ${formatoPrecio(
                                        item.quantity * Number(item.price)
                                    )}
                                </td>

                                <td>
                                    <button
                                        className="remove-item-button"
                                        type="button"
                                        title="Eliminar producto"
                                        aria-label={`Eliminar ${item.name} del carrito`}
                                        onClick={() =>
                                            removeItemFromOrder(item.id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6">
                                Total: <strong>${formatoPrecio(total)}</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default Order;
