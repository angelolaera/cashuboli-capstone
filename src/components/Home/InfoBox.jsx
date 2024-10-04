import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Flotta from "../asset/img/flotta.png";
import Logo from "../asset/img/logo.png";
import Percorso from "../asset/img/percorso.png";
import Mosaico from "../asset/img/gallery.png";
import Blog from "../asset/img/blog.png";
import Progetta from "../asset/img/progetta.png";
import "./InfoBox.css";

function InfoBox() {
  return (
    <Container className="mb-5">
      <h1 className="titleInfo text-center mt-5">SCOPRICI</h1>
      <Row className="mt-5">
        <Col xs={12} sm={4} className="text-center position-relative">
          <img src={Logo} alt="Immagine 1" className="box border rounded" />
          <div className="overlay-text">PERCHÈ CASHUBOLI</div>
        </Col>
        <Col xs={12} sm={4} className="text-center position-relative">
          <img src={Flotta} alt="Immagine 2" className="box border rounded" />
          <div className="overlay-text">SCOPRI LA FLOTTA DELLE NOSTRE BICI</div>
        </Col>
        <Col xs={12} sm={4} className="text-center position-relative">
          <img src={Percorso} alt="Immagine 3" className="box border rounded" />
          <div className="overlay-text">TOUR E PERCORSI</div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} sm={4} className="text-center position-relative">
          <img src={Mosaico} alt="Immagine 4" className="box border rounded" />
          <div className="overlay-text">GALLERY</div>
        </Col>
        <Col xs={12} sm={4} className="text-center position-relative">
          <img src={Progetta} alt="Immagine 6" className="box border rounded" />
          <div className="overlay-text">PROGETTA CON NOI!</div>
        </Col>
        <Col xs={12} sm={4} className="text-center position-relative">
          <img src={Blog} alt="Immagine 5" className="box border rounded" />
          <div className="overlay-text">BLOG</div>
        </Col>
      </Row>
    </Container>
  );
}

export default InfoBox;
