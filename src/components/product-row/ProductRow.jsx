import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductRow({
    prod,
    handleEdit,
    handleDelete,
    editingProductId
}) {
    const estaEditando =
        String(editingProductId) === String(prod.id);

    return (
        <tr className={estaEditando ? "editing-product" : ""}>
            <td>
                <img src={prod.image} alt={prod.name} />
            </td>

            <td className="productName">{prod.name}</td>
            <td>{prod.brand}</td>
            <td>{prod.category}</td>
            <td>${Number(prod.price).toLocaleString("es-AR")}</td>
            <td>{prod.stock}</td>
            <td>{prod.createdAt}</td>

            <td>
                <p className="product-description">
                    {prod.description}
                </p>
            </td>
            <td>
                <div className="product-actions">
                    <button
                        className="btn-action btn-edit"
                        type="button"
                        title="Editar producto"
                        aria-label={`Editar ${prod.name}`}
                        onClick={() => handleEdit(prod.id)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                        className="btn-action btn-delete"
                        type="button"
                        title="Eliminar producto"
                        aria-label={`Eliminar ${prod.name}`}
                        onClick={() => handleDelete(prod.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </td>
        </tr>
    );
}