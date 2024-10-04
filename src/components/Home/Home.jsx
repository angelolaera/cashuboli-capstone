import "../Home/Carousel.css";
import "../Home/InfoBox.css";
import "../Home/Newsletter.css";
import "../Home/PartnerCarousel.css";
import UncontrolledCarousel from "./Carousel";
import InfoBox from "./InfoBox";
import NewsletterBox from "./Newsletter";
import PartnerCarousel from "./PartnerCarousel";

function Home() {
  return (
    <>
      <UncontrolledCarousel />
      <InfoBox />
      <PartnerCarousel />
      <NewsletterBox />
    </>
  );
}

export default Home;
