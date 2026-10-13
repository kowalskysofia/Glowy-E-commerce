
import { useState } from "react";
import { useSearchParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

import ProductContainer from "../../components/product-container/ProductContainer";
import "./Products.css";

const CATEGORIAS = [
    { label: "Todas", value: "" },
    { label: "Hidratación", value: "hidratacion" },
    { label: "Sérums", value: "serums" },
    { label: "Limpieza", value: "limpieza" },
    { label: "Protección solar", value: "proteccion-solar" },
    { label: "Mascarillas", value: "mascarillas" },
];

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [busqueda, setBusqueda] = useState("");
    const [orden, setOrden] = useState("default");

    const categoriaSeleccionada = searchParams.get("category") || "";

    function seleccionarCategoria(categoria) {
        const nuevosParametros = new URLSearchParams(searchParams.toString());

        if (categoria) {
            nuevosParametros.set("category", categoria);
        } else {
            nuevosParametros.delete("category");
        }

        setSearchParams(nuevosParametros);
    }

    return (
        <section className="products-page">
            <div className="products-heading">
                <div>
                    <h1>Nuestros productos</h1>
                    <p>Encontrá los productos ideales para tu rutina.</p>
                </div>

                <div className="products-search">
                    <FontAwesomeIcon icon={faSearch} />

                    <input
                        id="buscar-productos"
                        type="search"
                        placeholder="Buscar productos..."
                        aria-label="Buscar productos"
                        value={busqueda}
                        onChange={(event) => setBusqueda(event.target.value)}
                    />
                </div>
            </div>

            <div className="products-toolbar">
                <div className="mobile-categories">
                    <span className="filter-label">Categorías</span>

                    <div className="categories-container">
                        {CATEGORIAS.map((categoria) => (
                            <button
                                key={categoria.value || "todas"}
                                type="button"
                                className={
                                    categoriaSeleccionada === categoria.value
                                        ? "category-button active"
                                        : "category-button"
                                }
                                onClick={() => seleccionarCategoria(categoria.value)}
                                aria-pressed={categoriaSeleccionada === categoria.value}
                            >
                                {categoria.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mobile-sort">
                    <label htmlFor="orden-productos">
                        <FontAwesomeIcon icon={faArrowDownWideShort} />
                        Ordenar:
                    </label>

                    <select
                        id="orden-productos"
                        value={orden}
                        onChange={(event) => setOrden(event.target.value)}
                    >
                        <option value="default">Predeterminado</option>
                        <option value="price-asc">Precio: menor a mayor</option>
                        <option value="price-desc">Precio: mayor a menor</option>
                        <option value="name-asc">Nombre: A-Z</option>
                        <option value="name-desc">Nombre: Z-A</option>
                    </select>
                </div>
            </div>

            <div className="products-layout">
                <aside className="products-sidebar" id="categorias">
                    <h2>Categorías</h2>

                    <div className="sidebar-categories">
                        {CATEGORIAS.map((categoria) => (
                            <button
                                key={categoria.value || "todas"}
                                type="button"
                                className={
                                    categoriaSeleccionada === categoria.value
                                        ? "sidebar-category active"
                                        : "sidebar-category"
                                }
                                onClick={() => seleccionarCategoria(categoria.value)}
                                aria-pressed={categoriaSeleccionada === categoria.value}
                            >
                                {categoria.label}
                            </button>
                        ))}
                    </div>
                </aside>
                <main className="products-results">
                    <ProductContainer
                        category={categoriaSeleccionada}
                        search={busqueda}
                        sort={orden}
                    />
                </main>
            </div>
        </section>
    );
}

export default Products;
