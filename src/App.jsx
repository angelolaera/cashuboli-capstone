import "./components/Header/Header.css";
import "./components/Navbar/Navbar.css";
import "./components/Carousel/Carousel.css";
import "./components/InfoBox/InfoBox.css";
import "./components/PartnerCarousel/PartnerCarousel.css";
import "./components/NewsletterBox/Newsletter.css";
import Header from "./components/Header/Header";
import BarraNavigazione from "./components/Navbar/Navbar";
import UncontrolledCarousel from "./components/Carousel/Carousel";
import InfoBox from "./components/InfoBox/InfoBox";
import PartnerCarousel from "./components/PartnerCarousel/PartnerCarousel";
import NewsletterBox from "./components/NewsletterBox/Newsletter";

function App() {
  return (
    <>
      <Header />
      <BarraNavigazione />
      <UncontrolledCarousel />
      <InfoBox />
      <PartnerCarousel />
      <NewsletterBox />
    </>
  );
}

export default App;
