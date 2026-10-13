

import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLaptop } from "@fortawesome/free-solid-svg-icons";

import "./About.css";

import aboutHero from "../../assets/images/about/image-about.jpeg";
import aboutIllustration from "../../assets/images/about/image-about-2.png";
import aboutProducts from "../../assets/images/about/image-about-3.jfif";

import wheatIcon from "../../assets/images/icons/icon-wheat.png";
import rabbitIcon from "../../assets/images/icons/icon-rabbit.png";
import hydrationIcon from "../../assets/images/icons/icon-hidratación.svg";

function About() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <img src={aboutHero} alt="Sobre Glowy" />
            </section>

            <section className="history">
                <div className="section-wrapper">
                    <div className="info-content">
                        <h2>Nuestra historia</h2>

                        <p>
                            En Glowy creemos que el cuidado de la piel debe ser
                            simple y efectivo. Nacimos con el objetivo de ofrecer
                            productos seleccionados cuidadosamente para acompañar
                            tu rutina diaria, combinando calidad, confianza y
                            bienestar.
                        </p>

                        <p>
                            Trabajamos con fórmulas reconocidas por su eficacia y
                            elegimos productos que ayudan a potenciar la salud de
                            la piel sin complicaciones. Porque una rutina sencilla
                            también puede generar grandes resultados.
                        </p>
                    </div>

                    <div className="info-image">
                        <img
                            src={aboutIllustration}
                            alt="Ilustración sobre el cuidado de la piel"
                        />
                    </div>
                </div>
            </section>

            <section className="beneficios">
                <div className="beneficio">
                    <img
                        src={wheatIcon}
                        alt=""
                        aria-hidden="true"
                    />

                    <div>
                        <h3>Ingredientes seleccionados</h3>
                        <p>
                            Elegimos productos formulados con ingredientes
                            reconocidos por su calidad y eficacia.
                        </p>
                    </div>
                </div>

                <div className="beneficio">
                    <img
                        src={rabbitIcon}
                        alt=""
                        aria-hidden="true"
                    />

                    <div>
                        <h3>Cruelty Free</h3>
                        <p>
                            Apoyamos marcas comprometidas con el respeto por
                            los animales.
                        </p>
                    </div>
                </div>

                <div className="beneficio">
                    <img
                        src={hydrationIcon}
                        alt=""
                        aria-hidden="true"
                    />

                    <div>
                        <h3>Calidad y confianza</h3>
                        <p>
                            Seleccionamos productos pensados para acompañarte
                            en cada etapa de tu rutina.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mission">
                <div className="mission-content">
                    <h2>Nuestra misión</h2>

                    <p>
                        Nuestra misión es acercar productos de skincare
                        confiables y accesibles que ayuden a cada persona a
                        sentirse cómoda y segura con su piel.
                    </p>

                    <p>
                        Buscamos promover una belleza real, consciente y basada
                        en el cuidado diario, priorizando la salud de la piel
                        por encima de las tendencias pasajeras.
                    </p>
                </div>
            </section>

            <section className="history selfcare">
                <div className="section-wrapper">
                    <div className="info-image">
                        <img
                            src={aboutProducts}
                            alt="Productos de cuidado de la piel"
                        />
                    </div>

                    <div className="info-content">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="about-heart-icon"
                            aria-hidden="true"
                        />

                        <h2>Más que una rutina, un momento para vos</h2>

                        <p>
                            Creemos que dedicar unos minutos al cuidado personal
                            también es una forma de bienestar. Por eso queremos
                            acompañarte con productos que hagan de tu rutina un
                            momento simple, agradable y efectivo.
                        </p>

                        <Link to="/products" className="btn-gnl">
                            Conocé nuestros productos
                        </Link>
                    </div>
                </div>
            </section>

            <section className="developer-section">
                <div className="section-wrapper">
                    <div className="developer-icon">
                        <FontAwesomeIcon
                            icon={faLaptop}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="developer-content">
                        <span className="section-subtitle">
                            DESARROLLADORA
                        </span>

                        <h2>Sofía Cabrera Kowalsky</h2>

                        <p>
                            Soy Community Manager freelance y estudiante de
                            desarrollo web. Este proyecto fue desarrollado como
                            parte de mi formación, combinando diseño, maquetación
                            y programación para crear una experiencia web
                            funcional y estética.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
