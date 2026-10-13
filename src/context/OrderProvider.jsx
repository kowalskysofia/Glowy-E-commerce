
import { createContext, useEffect, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let totalAcumulado = 0;
        let totalItemsAcumulados = 0;

        for (const producto of order) {
            totalAcumulado += Number(producto.price) * producto.quantity;
            totalItemsAcumulados += producto.quantity;
        }

        setTotal(totalAcumulado);
        setTotalItems(totalItemsAcumulados);
    }, [order]);

    function addItemToOrder(PRODUCTO) {
        const productoExistente = order.find(
            (item) => String(item.id) === String(PRODUCTO.id)
        );

        const stock = Number(PRODUCTO.stock);

        if (!productoExistente) {
            if (Number.isFinite(stock) && stock <= 0) {
                alert("Este producto no tiene stock disponible.");
                return;
            }

            setOrder([
                ...order,
                {
                    ...PRODUCTO,
                    quantity: 1
                }
            ]);

            return;
        }

        if (
            Number.isFinite(stock) &&
            productoExistente.quantity >= stock
        ) {
            alert("No se puede agregar más de este producto, stock insuficiente.");
            return;
        }

        setOrder(
            order.map((item) =>
                String(item.id) === String(PRODUCTO.id)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function decreaseItemQuantity(productoId) {
        setOrder(
            order.map((item) =>
                String(item.id) === String(productoId) && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }

   
    function removeItemFromOrder(productoId) {
        setOrder(
            order.filter(
                (item) => String(item.id) !== String(productoId)
            )
        );
    }

    return (
        <OrderContext.Provider
            value={{
                order,
                addItemToOrder,
                decreaseItemQuantity,
                removeItemFromOrder,
                total,
                totalItems
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export { OrderProvider, OrderContext };
