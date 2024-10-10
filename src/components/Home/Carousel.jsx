import Carousel from "react-bootstrap/Carousel";
import Carosello1 from "../../asset/img/Carosello1.jpg";
import Carosello2 from "../../asset/img/Carosello2.png";
import funtogo from "../../asset/img/Fun_2_go.jpg";

function UncontrolledCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="immagine d-block w-100" src={Carosello2} alt="First slide" />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="title">CASHUBOLI</h1>
          <p className="paragraph">E-bike accessibili per un’avventura senza confini</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="immagine d-block w-100" src={funtogo} alt="Second slide" />
        <Carousel.Caption className="carousel-caption-custom position-absolute top-50 start-50 translate-middle">
          <h1 className="title">ESPLORA LA PUGLIA SENZA BARRIERE</h1>
          <p className="paragraph">Vivi il nostro paesaggio su e-bike accessibili a tutti</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="immagine d-block w-100" src={Carosello1} alt="Third slide" />
        <Carousel.Caption className="carousel-caption-custom position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="title">
            LA PUGLIA A PORTATA DI <br /> E-BIKE
          </h1>
          <p className="paragraph">Scopri la valle d’Itria e la costa adriatica con Cashuboli</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledCarousel;
