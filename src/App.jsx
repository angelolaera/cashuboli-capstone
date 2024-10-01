import "./components/Header/Header.css";
import "./components/Navbar/Navbar.css";
import "./components/Carousel/Carousel.css";
import Header from "./components/Header/Header";
import BarraNavigazione from "./components/Navbar/Navbar";
import UncontrolledCarousel from "./components/Carousel/Carousel";

function App() {
  return (
    <>
      <Header />
      <BarraNavigazione />
      <UncontrolledCarousel />
    </>
  );
}

export default App;
