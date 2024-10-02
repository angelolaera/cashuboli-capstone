import "./components/Header/Header.css";
import "./components/Navbar/Navbar.css";
import "./components/Carousel/Carousel.css";
import "./components/InfoBox/InfoBox.css";
import Header from "./components/Header/Header";
import BarraNavigazione from "./components/Navbar/Navbar";
import UncontrolledCarousel from "./components/Carousel/Carousel";
import InfoBox from "./components/InfoBox/InfoBox";

function App() {
  return (
    <>
      <Header />
      <BarraNavigazione />
      <UncontrolledCarousel />
      <InfoBox />
    </>
  );
}

export default App;
