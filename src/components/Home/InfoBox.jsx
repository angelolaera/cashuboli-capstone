import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Flotta from "../../asset/img/flotta.png";
import Logo from "../../asset/img/logo.png";
import Percorso from "../../asset/img/percorso.png";
import Mosaico from "../../asset/img/gallery.png";
import Blog from "../../asset/img/blog.png";
import Progetta from "../../asset/img/progetta.png";
import "./InfoBox.css";
import "animate.css";
import { useInView } from "react-intersection-observer";

function InfoBox() {
  const { ref: refLogo, inView: inViewLogo } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refFlotta, inView: inViewFlotta } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refPercorso, inView: inViewPercorso } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refGallery, inView: inViewGallery } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refProgetta, inView: inViewProgetta } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refBlog, inView: inViewBlog } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Container className="mb-5 info-box-container">
      <h1 className="titleInfo text-center mt-5">SCOPRICI</h1>
      <Row className="mt-5 justify-content-center">
        <Col xs={12} sm={6} md={4} className="text-center position-relative info-box-col" ref={refLogo}>
          <div className={`info-box ${inViewLogo ? "animate__animated animate__fadeInUp" : ""}`}>
            <img src={Logo} alt="Logo" className="box-image rounded shadow-lg" />
            <div className="overlay-text">PERCHÈ CASHUBOLI</div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} className="text-center position-relative info-box-col" ref={refFlotta}>
          <div className={`info-box ${inViewFlotta ? "animate__animated animate__fadeInUp animate__delay-1s" : ""}`}>
            <img src={Flotta} alt="Flotta" className="box-image rounded shadow-lg" />
            <div className="overlay-text">SCOPRI LA FLOTTA DELLE NOSTRE BICI</div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} className="text-center position-relative info-box-col" ref={refPercorso}>
          <div className={`info-box ${inViewPercorso ? "animate__animated animate__fadeInUp animate__delay-2s" : ""}`}>
            <img src={Percorso} alt="Percorso" className="box-image rounded shadow-lg" />
            <div className="overlay-text">TOUR E PERCORSI</div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs={12} sm={6} md={4} className="text-center position-relative info-box-col" ref={refGallery}>
          <div className={`info-box ${inViewGallery ? "animate__animated animate__fadeInUp" : ""}`}>
            <img src={Mosaico} alt="Mosaico" className="box-image rounded shadow-lg" />
            <div className="overlay-text">GALLERY</div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} className="text-center position-relative info-box-col" ref={refProgetta}>
          <div className={`info-box ${inViewProgetta ? "animate__animated animate__fadeInUp animate__delay-1s" : ""}`}>
            <img src={Progetta} alt="Progetta" className="box-image rounded shadow-lg" />
            <div className="overlay-text">PROGETTA CON NOI!</div>
          </div>
        </Col>
        <Col xs={12} sm={6} md={4} className="text-center position-relative info-box-col" ref={refBlog}>
          <div className={`info-box ${inViewBlog ? "animate__animated animate__fadeInUp animate__delay-2s" : ""}`}>
            <img src={Blog} alt="Blog" className="box-image rounded shadow-lg" />
            <div className="overlay-text">BLOG</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default InfoBox;
