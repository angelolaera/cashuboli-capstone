import Carousel from "react-bootstrap/Carousel";
import Carosello1 from "../asset/img/Carosello1.jpg";
import Carosello2 from "../asset/img/Carosello2.png";

function UncontrolledCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="immagine d-block w-100" src={Carosello2} alt="First slide" />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="title">CASHUBOLI</h1>
          <p className="paragraph">Scegli con noi la prossima avventura, accessibile!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="immagine d-block w-100" src={Carosello1} alt="Second slide" />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="title">Second slide label</h1>
          <p className="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="immagine d-block w-100" src={Carosello1} alt="Third slide" />
        <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="title">Third slide label</h1>
          <p className="paragraph">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledCarousel;
