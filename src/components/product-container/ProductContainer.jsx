
import "./ProductContainer.css";
import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import { getproducts } from "../../services/product.service";

const CATEGORIAS = {
    hidratacion: ["hidrat"],
    serums: ["serum"],
    limpieza: ["limpieza", "limpiador", "cleanser", "cleansing"],
    "proteccion-solar": ["proteccion solar", "protector solar", "solar", "proteccion", "protector",],
    mascarillas: ["mascarilla", "mascarillas", "mask"]
};

function normalizarTexto(texto) {
    return String(texto ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function ProductContainer({
    limit,
    category = "",
    search = "",
    sort = "default"
}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function obtenerProductos() {
            try {
                const productos = await getproducts();
                setProducts(productos);
            } catch (error) {
            console.error("Error al obtener productos:", error);
            setHasError(true);
            } finally {
                setLoading(false);
            }
        }

        obtenerProductos();
    }, []);

    let productosFiltrados = [...products];

    if (category) {
        const categoriasBuscadas = CATEGORIAS[category] || [
            normalizarTexto(category)
        ];

        productosFiltrados = productosFiltrados.filter((product) => {
            const categoriaProducto = normalizarTexto(
                product.category ?? product.categoria
            );

            return categoriasBuscadas.some((categoria) =>
                categoriaProducto.includes(categoria)
            );
        });
    }

    if (search.trim()) {
        const busquedaNormalizada = normalizarTexto(search);

        productosFiltrados = productosFiltrados.filter((product) => {
            const nombre = normalizarTexto(product.name);
            const descripcion = normalizarTexto(product.description);

            return (
                nombre.includes(busquedaNormalizada) ||
                descripcion.includes(busquedaNormalizada)
            );
        });
    }

    if (sort === "price-asc") {
        productosFiltrados.sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    } else if (sort === "price-desc") {
        productosFiltrados.sort(
            (a, b) => Number(b.price) - Number(a.price)
        );
    } else if (sort === "name-asc") {
        productosFiltrados.sort((a, b) =>
            String(a.name ?? "").localeCompare(
                String(b.name ?? ""),
                "es",
                { sensitivity: "base" }
            )
        );
    } else if (sort === "name-desc") {
        productosFiltrados.sort((a, b) =>
            String(b.name ?? "").localeCompare(
                String(a.name ?? ""),
                "es",
                { sensitivity: "base" }
            )
        );
    }
    const productsToShow =
        typeof limit === "number"
            ? productosFiltrados.slice(0, limit)
            : productosFiltrados;
    if (loading) {
        return <p>Cargando productos...</p>;
    }
    if (hasError) {
        return (
            <p className="error">
                No se pudieron cargar los productos. Intentá nuevamente.
            </p>
        );
    }
    if (productsToShow.length === 0) {
        return (
            <p>
                {category || search.trim()
                    ? "No encontramos productos que coincidan con tu búsqueda."
                    : "Todavía no hay productos para mostrar."}
            </p>
        );
    }
    return (
        <div className="products-container">
            {productsToShow.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>

    );

}

export default ProductContainer;
