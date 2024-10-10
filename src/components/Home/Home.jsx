import "../Home/Carousel.css";
import "../Home/InfoBox.css";
import "../Home/Footer.css";
import "../Home/PartnerCarousel.css";
import "../Home/Home.css";
import video_0001 from "../../asset/vid/0001.mp4";
import UncontrolledCarousel from "./Carousel";
import InfoBox from "./InfoBox";
import PartnerCarousel from "./PartnerCarousel";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <UncontrolledCarousel />
      <InfoBox />
      <PartnerCarousel />
      <div style={{ width: "100%", height: "500px", overflow: "hidden" }}>
        <video style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay loop muted src={video_0001} type="video/mp4" />
      </div>
      <Footer />
    </>
  );
}

export default Home;
