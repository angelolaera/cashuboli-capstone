import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import "animate.css";

const PartnerCarousel = () => {
  // Osserva quando il carosello diventa visibile
  const { ref: refCarousel, inView: inViewCarousel } = useInView({ triggerOnce: true });

  return (
    <Container className="text-center my-4" ref={refCarousel}>
      <hr className="divisoryLine" />
      <h2 className={`partnerTitle ${inViewCarousel ? "animate__animated animate__fadeInDown" : ""}`}>Partners di Cashuboli</h2>
      <Carousel className="mt-3">
        <Carousel.Item className="mb-3">
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs={6} md={2} className={inViewCarousel ? "animate__animated animate__fadeInUp" : ""}>
              <a href="https://www.regione.puglia.it/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.regione.puglia.it/o/portale-istituzionale-theme/images/svg/regione_puglia_header_final.svg"
                  alt="Regione Puglia"
                  className="d-block mx-auto img-fluid"
                />
              </a>
            </Col>
            <Col xs={6} md={2} className={inViewCarousel ? "animate__animated animate__fadeInUp animate__delay-1s" : ""}>
              <a href="https://www.re-moove.it/it/" target="_blank" rel="noopener noreferrer">
                <img src="https://www.re-moove.it/images/home/Logo_Remoove_feature.png" alt="Remoove" className="d-block mx-auto img-fluid" />
              </a>
            </Col>
            <Col xs={6} md={2} className={inViewCarousel ? "animate__animated animate__fadeInUp animate__delay-2s" : ""}>
              <a href="https://www.vanraam.com/en-gb" target="_blank" rel="noopener noreferrer">
                <img
                  src="data:image/png;base64,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"
                  alt="Vanraam"
                  className="d-block mx-auto img-fluid"
                />
              </a>
            </Col>
            <Col xs={6} md={2} className={inViewCarousel ? "animate__animated animate__fadeInUp animate__delay-3s" : ""}>
              <a href="https://www.facebook.com/lamattaciclostoricapugliese/?locale=it_IT" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.bikeitalia.it/wp-content/uploads/2024/05/la-matta-giro-ditalia-depoca-logo.jpg"
                  alt="La Matta"
                  className="d-block mx-auto img-fluid"
                />
              </a>
            </Col>
            <Col xs={6} md={2} className={inViewCarousel ? "animate__animated animate__fadeInUp animate__delay-4s" : ""}>
              <a href="https://www.getyourguide.it/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://consumersiteimages.trustpilot.net/business-units/4be8113c000064000509f47a-198x149-1x.avif"
                  alt="GetYourGuide"
                  className="d-block mx-auto img-fluid"
                />
              </a>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default PartnerCarousel;
