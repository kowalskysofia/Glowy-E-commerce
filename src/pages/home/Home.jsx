import "./Home.css";
import { useEffect, useState } from "react";
import ProductContainer from "../../components/product-container/ProductContainer";
import { Link } from "react-router";
import { getproducts } from "../../services/product.service.js";

function Home() {
  const [producto, setProducto] = useState(null);
  const [cargandoProducto, setCargandoProducto] = useState(true);

  useEffect(() => {
    async function obtenerProductoDestacado() {
      try {
        const productos = await getproducts();

        setProducto(productos.length > 0 ? productos[0] : null);
      } catch (error) {
        console.error("Error al obtener el producto destacado:", error);
      } finally {
        setCargandoProducto(false);
      }
    }
    obtenerProductoDestacado();
  }, []);

  return (
    <>
      <section id="hero">
        <video
          className="hero-video"
          src="/src/assets/videos/video-banner.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="section-wrapper">
          <div className="hero-content">
            <h2>Belleza real, natural y consciente</h2>

            <p>
              En Glowy creemos que el cuidado de la piel va más allá de lo
              superficial. Fórmulas efectivas, ingredientes seguros y productos
              pensados para vos.
            </p>

            <Link to="/about">Conocer más</Link>
          </div>
        </div>
      </section>
      <section id="info">
        <div className="section-wrapper">
          {cargandoProducto ? (
            <p>Cargando producto destacado...</p>
          ) : producto ? (
            <>
              <div className="info-content">
                <h2>{producto.name}</h2>

                <p>{producto.description}</p>

                <Link to={`/product-detail/${producto.id}`}>
                  Comprar ahora
                </Link>
              </div>

              <div className="info-image">
                <img src={producto.image} alt={producto.name} />
              </div>
            </>
          ) : (
            <p>No se pudo cargar el producto destacado.</p>
          )}
        </div>
      </section>


      <section id="categorias" className="categories">
        <h2>Categorías</h2>

        <div className="categories-container">
          <div className="category">
            <Link to="/products?category=hidratacion">
              <img
                className="icon-image hydration"
                src="/src/assets/images/icons/icon-hidratación.svg"
                alt="Hidratación"
              />
              <h3>Hidratación</h3>
            </Link>
          </div>

          <div className="category">
            <Link to="/products?category=serums">
              <img
                className="icon-image serum"
                src="/src/assets/images/icons/icon-serum.svg"
                alt="Sérums"
              />
              <h3>Sérums</h3>
            </Link>
          </div>

          <div className="category">
            <Link to="/products?category=limpieza">
              <img
                className="icon-image cleaning"
                src="/src/assets/images/icons/icon-limpieza.svg"
                alt="Limpieza"
              />
              <h3>Limpieza</h3>
            </Link>
          </div>

          <div className="category">
            <Link to="/products?category=proteccion-solar">
              <img
                className="icon-image sunscreen"
                src="/src/assets/images/icons/icon-protección.svg"
                alt="Protección solar"
              />
              <h3>Protección solar</h3>
            </Link>
          </div>

          <div className="category">
            <Link to="/products?category=mascarillas">
              <img
                className="icon-image mask"
                src="/src/assets/images/icons/icon-mascarilla.svg"
                alt="Mascarillas"
              />
              <h3>Mascarillas</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="destacados-section">
        <h2>Productos Destacados</h2>
        <ProductContainer limit={4} />
      </section>

      <section className="beneficios">
        <div className="beneficio">
          <img
            src="/src/assets/images/icons/icon-rabbit.png"
            alt="Cruelty Free"
          />
          <div>
            <h3>Cruelty Free</h3>
            <p>No testeamos en animales.</p>
          </div>
        </div>
        <div className="beneficio">
          <img
            src="/src/assets/images/icons/icon-test.png"
            alt="Clínicamente testado"
          />
          <div>
            <h3>Clínicamente testado</h3>
            <p>Productos evaluados por especialistas.</p>
          </div>
        </div>
        <div className="beneficio">
          <img
            src="/src/assets/images/icons/icon-delivery-truck.png"
            alt="Envío gratis"
          />
          <div>
            <h3>Envío gratis</h3>
            <p>En compras superiores a $80.000.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;