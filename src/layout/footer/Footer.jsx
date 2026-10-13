import "./footer.css"
function Footer() {
  return (
   <>
  <footer>
    <div className="footer-logo">
      <h2>GLOWY</h2>
      <p>everyday skincare </p>
    </div>
    <div className="footer-links">
      <h3>Navegación</h3>
      <ul>
        <li>
          <a href="#hero">Inicio</a>
        </li>
        <li>
          <a href="/pages/products.html">Productos</a>
        </li>
        <li>
          <a href="#categorias">Categorías</a>
        </li>
        <li>
          <a href="/pages/about.html">Sobre Nosotros</a>
        </li>
        <li>
          <a href="/pages/contact.html">Contacto</a>
        </li>
      </ul>
    </div>
    <div className="footer-social">
      <h3>Seguinos</h3>
      <ul>
        <li>
          <a href="#">
            <i className="bi bi-instagram" />
            Instagram
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bi bi-facebook" />
            Facebook
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bi bi-tiktok" />
            TikTok
          </a>
        </li>
      </ul>
    </div>
  </footer>
  <div className="footer-copy">
    <p>© 2026 Glowy. Todos los derechos reservados.</p>
  </div>
</>

  )
}

export default Footer 