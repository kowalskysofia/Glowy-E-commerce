
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faUser,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./Header.css";
import useOrder from "../../context/useOrder";

const NAV_LINKS = [
    {
        text: "Inicio",
        path: "/",
    },
    {
        text: "Productos",
        path: "/products",
    },
    
    {
        text: "Sobre Nosotros",
        path: "/about",
    },
    {
        text: "Contacto",
        path: "/contact",
    },
];

const ADMIN_LINKS = [
    {
        text: "Agregar Producto",
        path: "/admin/products",
    },
    {
        text: "Ver usuarios",
        path: "/admin/users",
    },
];

function Header() {
    const { totalItems } = useOrder();
    const location = useLocation();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const isUserAdmin = true;

   
    const esPaginaAdmin = location.pathname.startsWith("/admin");

    
    useEffect(() => {
        setMenuAbierto(false);
    }, [location.pathname, location.search, location.hash]);

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <header className="site-header">
            <div className="top-bar">
                <img
                    src="/src/assets/images/icons/icon-delivery-truck.png"
                    alt=""
                />
                <span>Envíos gratis en tu compra mayor a $80.000</span>
            </div>

            <nav className="main-navbar">
                <div className="navbar-top">
                    <button
                        type="button"
                        className="menu-toggle"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuAbierto}
                        aria-controls="navbar-links"
                    >
                        <FontAwesomeIcon icon={menuAbierto ? faXmark : faBars} />
                    </button>

                    <NavLink
                        className="logo-container"
                        to="/"
                        onClick={cerrarMenu}
                    >
                        <h1>GLOWY</h1>
                        <p>everyday skincare</p>
                    </NavLink>

                    <div className="header-actions">
                        <NavLink
                            to="/register"
                            className="header-icon account-link"
                            aria-label="Mi cuenta"
                            title="Mi cuenta"
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </NavLink>

                        {!esPaginaAdmin && (
                            <NavLink
                                to="/carrito"
                                className="header-icon cart-link"
                                aria-label={`Carrito, ${totalItems} productos`}
                                title="Carrito"
                            >
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span className="cart-count">{totalItems}</span>
                            </NavLink>
                        )}
                    </div>
                </div>

                <div
                    id="navbar-links"
                    className={`navbar-links ${menuAbierto ? "menu-abierto" : ""}`}
                >
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className="nav-link"
                            onClick={cerrarMenu}
                        >
                            {link.text}
                        </NavLink>
                    ))}
                </div>

                {isUserAdmin && (
                    <div className="admin-shortcuts">
                        {ADMIN_LINKS.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className="admin-link"
                            >
                                {link.text}
                            </NavLink>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
