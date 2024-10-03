import React from "react";
import { Carousel } from "react-bootstrap";
import "./PartnerCarousel.css"; // Facoltativo: per lo stile personalizzato

const partners = [
  {
    name: "Regione Puglia",
    imageUrl: "https://www.regione.puglia.it/o/portale-istituzionale-theme/images/svg/regione_puglia_header_final.svg",
    website: "https://www.regione.puglia.it/",
  },
  {
    name: "Remoove",
    imageUrl: "https://www.re-moove.it/images/home/Logo_Remoove_feature.png",
    website: "https://www.re-moove.it/it/",
  },
  {
    name: "Partner 3",
    imageUrl: "https://example.com/logo3.png",
    website: "https://partner3.com",
  },
  // Aggiungi più partner qui
];

function PartnerCarousel() {
  return (
    <Carousel>
      {partners.map((partner, index) => (
        <Carousel.Item key={index}>
          <a href={partner.website} target="_blank" rel="noopener noreferrer">
            <img className="d-block w-100" src={partner.imageUrl} alt={`Logo di ${partner.name}`} />
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default PartnerCarousel;
