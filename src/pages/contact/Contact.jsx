
import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";

import "./Contact.css";

function Contact() {
  const [aviso, setAviso] = useState("");
  const [errores, setErrores] = useState({});


  function manejarEnvio(event) {
    event.preventDefault();

    const datos = new FormData(event.currentTarget);

    const nombre = String(datos.get("nombre") || "").trim();
    const email = String(datos.get("email") || "").trim();
    const mensaje = String(datos.get("mensaje") || "").trim();
    const nuevosErrores = {};
    if (!nombre) {
      nuevosErrores.nombre = "El nombre completo es obligatorio.";
    } else if (nombre.length < 5) {
      nuevosErrores.nombre = "El nombre debe tener al menos 5 caracteres.";
    } else if (nombre.length > 40) {
      nuevosErrores.nombre = "El nombre no puede superar los 40 caracteres.";
    }

    if (!email) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email = "Ingresá un correo electrónico válido.";
    }

    if (!mensaje) {
      nuevosErrores.mensaje = "El mensaje es obligatorio.";
    } else if (mensaje.length < 5) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 5 caracteres.";
    } else if (mensaje.length > 300) {
      nuevosErrores.mensaje = "El mensaje no puede superar los 300 caracteres.";
    }
    setErrores(nuevosErrores);
    setAviso("");

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const asunto = `Consulta desde Glowy - ${nombre}`;

    const cuerpo = [
      `Nombre: ${nombre}`,
      `Correo electrónico: ${email}`,
      "",
      "Mensaje:",
      mensaje
    ].join("\n");

    const enlaceCorreo =
      `mailto:glowy@gmail.com` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;
    setAviso(

    );

    window.location.href = enlaceCorreo;
  }

  return (
    <main className="contact-page">
      <div className="contact-title">
        <h1>Contacto</h1>
        <p>Estamos para ayudarte con lo que necesites.</p>
      </div>
      <div className="ubication-map">
        <iframe
          title="Ubicación de Glowy en Uruguay 1266, Buenos Aires"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d921.6665154235857!2d-58.38729898838245!3d-34.59287965259296!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabbe8eac3f7%3A0x96b174e7dc9ebc9f!2sUruguay%201266%2C%20C1016%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1781399982382!5m2!1ses!2sar"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info-heading">
            <h2>Medios de contacto</h2>
            <p>
              Elegí el medio que prefieras para ponerte en
              contacto con nosotros.
            </p>
          </div>
          <div className="contact-features">
            <div className="feature">
              <FontAwesomeIcon
                icon={faPhone}
                className="feature-icon"
                aria-hidden="true"
              />
              <div className="feature-text">
                <span>Teléfono</span>
                <p>
                  <a href="tel:+541112345678">
                    +54 11 1234 5678
                  </a>
                </p>
                <p>Lunes a viernes de 9 a 18 hs.</p>
              </div>
            </div>

            <div className="feature">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="feature-icon"
                aria-hidden="true"
              />

              <div className="feature-text">
                <span>Email</span>
                <p>
                  <a href="mailto:glowy@gmail.com">
                    glowy@gmail.com
                  </a>
                </p>
                <p>Te respondemos a la brevedad.</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon feature-whatsapp">
                W
              </span>

              <div className="feature-text">
                <span>WhatsApp</span>
                <p>+54 11 1234 5678</p>
                <p>Lunes a viernes de 9 a 18 hs.</p>
              </div>
            </div>

            <div className="feature">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="feature-icon"
                aria-hidden="true"
              />
              <div className="feature-text">
                <span>Dirección</span>
                <p>
                  Uruguay 1266, C1016
                  <br />
                  Ciudad Autónoma de Buenos Aires.
                </p>
              </div>
            </div>
          </div>

          <div className="social-media">
            <p>Seguinos en nuestras redes</p>

            <div className="social-media-icons">
              <span className="social-label">Instagram</span>
              <span className="social-label">Facebook</span>
              <span className="social-label">TikTok</span>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="contact-info-heading">
            <h2>Contactanos</h2>
            <p>
              Completá el formulario y te responderemos lo antes
              posible.
            </p>
          </div>


          <form
            className="contact-message-form"
            onSubmit={manejarEnvio}
            noValidate
          >
            <label htmlFor="contact-name">Nombre completo</label>
            <input
              type="text"
              id="contact-name"
              name="nombre"
              placeholder="Ej. Ana Pérez"
              minLength={5}
              maxLength={40}
              required
            />

            {errores.nombre && (
              <p className="contact-error">{errores.nombre}</p>
            )}

            <label htmlFor="contact-email">Correo electrónico</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="tucorreo@gmail.com"
              required
            />

            {errores.email && (
              <p className="contact-error">{errores.email}</p>
            )}

            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              name="mensaje"
              maxLength={300}
              minLength={5}
              rows={4}
              placeholder="Escribí tu mensaje aquí..."
              required
            />

            {errores.mensaje && (
              <p className="contact-error">{errores.mensaje}</p>
            )}

            <button type="submit" className="btn-gnl">
              Enviar mensaje
            </button>

            {aviso && (
              <p className="contact-notice" role="status">
                {aviso}
              </p>
            )}
          </form>


          <p className="contact-back-link">
            ¿Querés seguir mirando productos?{" "}
            <Link to="/products">Ver productos</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Contact;
