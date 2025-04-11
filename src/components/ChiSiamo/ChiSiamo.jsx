import "./ChiSiamo.css";
import { Col, Container, Row } from "react-bootstrap";
import Mirko from "../../asset/img/Mirko.jpg";
import Facebook from "../../asset/img/facebook.png";
import Instagram from "../../asset/img/instagram.png";
import TikTok from "../../asset/img/tiktok.png";
import { useEffect, useRef } from "react";

function ChiSiamo() {
  const textColumnRef = useRef(null);

  useEffect(() => {
    const textColumn = textColumnRef.current;
    if (textColumn) {
      textColumn.classList.add("animate__animated", "animate__fadeIn"); // Aggiungiamo le classi di Animate.css
      // Puoi cambiare "animate__fadeIn" con altre animazioni di Animate.css
    }
  }, []);

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center mt-3">
        <Col xs={12} md={6} lg={6} className="text-center mb-4 photo-column">
          <div className="profile-container">
            <img src={Mirko} alt="Mirko Foto" className="profile-image rounded-circle" />
          </div>
          <div className="social-icons mt-3">
            <a href="https://www.facebook.com/mirko.deleonardis.7?locale=it_IT" className="social-link">
              <img src={Facebook} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/zonaa46/" className="social-link">
              <img src={Instagram} alt="Instagram" className="social-icon" />
            </a>
            <a
              href="https://www.tiktok.com/login?redirect_url=https%3A%2F%2Fwww.tiktok.com%2Fit-IT%2F&lang=en&enter_method=mandatorynpm"
              className="social-link"
            >
              <img src={TikTok} alt="TikTok" className="social-icon" />
            </a>
          </div>
        </Col>
        <Col xs={12} md={6} lg={6} className="text-column p-4" ref={textColumnRef}>
          <div>
            <h1 className="chisiamo_title">PERCHÈ CASHUBOLI</h1>
            <p className="chisiamo_paragraph">
              Cashuboli nasce nel cuore della Puglia, nella storica contrada Casabolicchio di Noci, da un'idea di Mirko De Leonardis. Siamo un progetto di
              turismo accessibile e sostenibile, dedicato a farvi scoprire le meraviglie di questa terra: dalla Valle d'Itria alla costa adriatica. La nostra
              sede, una pittoresca masseria, è il punto di partenza per un'esperienza che va oltre il semplice noleggio e-bike. Vogliamo che tutti, senza
              barriere di età o abilità, possano vivere l'emozione di esplorare la Puglia su due ruote. Crediamo nella valorizzazione del territorio esistente e
              offriamo un servizio flessibile e personalizzato, per un viaggio autentico e indimenticabile. Unisciti a noi e scopri la Puglia in un modo nuovo:
              lento, sostenibile, accessibile.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChiSiamo;
