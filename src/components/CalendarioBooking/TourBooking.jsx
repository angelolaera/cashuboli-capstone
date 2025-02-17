import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, InputGroup, Card } from "react-bootstrap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import BASE_URL from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Importa i moduli necessari

import "swiper/css";
import "swiper/css/pagination";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material";

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const countryCodes = [
  { code: "+1", country: "Stati Uniti" },
  { code: "+1", country: "Canada" },
  { code: "+7", country: "Russia" },
  { code: "+20", country: "Egitto" },
  { code: "+27", country: "Sudafrica" },
  { code: "+30", country: "Grecia" },
  { code: "+31", country: "Paesi Bassi" },
  { code: "+32", country: "Belgio" },
  { code: "+33", country: "Francia" },
  { code: "+34", country: "Spagna" },
  { code: "+36", country: "Ungheria" },
  { code: "+39", country: "Italia" },
  { code: "+40", country: "Romania" },
  { code: "+41", country: "Svizzera" },
  { code: "+43", country: "Austria" },
  { code: "+44", country: "Regno Unito" },
  { code: "+45", country: "Danimarca" },
  { code: "+46", country: "Svezia" },
  { code: "+47", country: "Norvegia" },
  { code: "+48", country: "Polonia" },
  { code: "+49", country: "Germania" },
  { code: "+51", country: "Perù" },
  { code: "+52", country: "Messico" },
  { code: "+53", country: "Cuba" },
  { code: "+54", country: "Argentina" },
  { code: "+55", country: "Brasile" },
  { code: "+56", country: "Cile" },
  { code: "+57", country: "Colombia" },
  { code: "+58", country: "Venezuela" },
  { code: "+60", country: "Malesia" },
  { code: "+61", country: "Australia" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Filippine" },
  { code: "+64", country: "Nuova Zelanda" },
  { code: "+65", country: "Singapore" },
  { code: "+66", country: "Thailandia" },
  { code: "+81", country: "Giappone" },
  { code: "+82", country: "Corea del Sud" },
  { code: "+84", country: "Vietnam" },
  { code: "+86", country: "Cina" },
  { code: "+90", country: "Turchia" },
  { code: "+91", country: "India" },
  { code: "+92", country: "Pakistan" },
  { code: "+93", country: "Afghanistan" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+95", country: "Myanmar" },
  { code: "+98", country: "Iran" },
  { code: "+211", country: "Sud Sudan" },
  { code: "+212", country: "Marocco" },
  { code: "+213", country: "Algeria" },
  { code: "+216", country: "Tunisia" },
  { code: "+218", country: "Libia" },
  { code: "+220", country: "Gambia" },
  { code: "+221", country: "Senegal" },
  { code: "+222", country: "Mauritania" },
  { code: "+223", country: "Mali" },
  { code: "+224", country: "Guinea" },
  { code: "+225", country: "Costa d'Avorio" },
  { code: "+226", country: "Burkina Faso" },
  { code: "+227", country: "Niger" },
  { code: "+228", country: "Togo" },
  { code: "+229", country: "Benin" },
  { code: "+230", country: "Mauritius" },
  { code: "+231", country: "Liberia" },
  { code: "+232", country: "Sierra Leone" },
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+235", country: "Ciad" },
  { code: "+236", country: "Repubblica Centrafricana" },
  { code: "+237", country: "Camerun" },
  { code: "+238", country: "Capo Verde" },
  { code: "+239", country: "São Tomé e Príncipe" },
  { code: "+240", country: "Guinea Equatoriale" },
  { code: "+241", country: "Gabon" },
  { code: "+242", country: "Repubblica del Congo" },
  { code: "+243", country: "Repubblica Democratica del Congo" },
  { code: "+244", country: "Angola" },
  { code: "+245", country: "Guinea-Bissau" },
  { code: "+246", country: "Diego Garcia" },
  { code: "+248", country: "Seychelles" },
  { code: "+249", country: "Sudan" },
  { code: "+250", country: "Ruanda" },
  { code: "+251", country: "Etiopia" },
  { code: "+252", country: "Somalia" },
  { code: "+253", country: "Gibuti" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+256", country: "Uganda" },
  { code: "+257", country: "Burundi" },
  { code: "+258", country: "Mozambico" },
  { code: "+260", country: "Zambia" },
  { code: "+261", country: "Madagascar" },
  { code: "+262", country: "Réunion" },
  { code: "+263", country: "Zimbabwe" },
  { code: "+264", country: "Namibia" },
  { code: "+265", country: "Malawi" },
  { code: "+266", country: "Lesotho" },
  { code: "+267", country: "Botswana" },
  { code: "+268", country: "Eswatini" },
  { code: "+269", country: "Comore" },
  { code: "+290", country: "Sant'Elena" },
  { code: "+291", country: "Eritrea" },
  { code: "+297", country: "Aruba" },
  { code: "+298", country: "Isole Faroe" },
  { code: "+299", country: "Groenlandia" },
  { code: "+350", country: "Gibilterra" },
  { code: "+351", country: "Portogallo" },
  { code: "+352", country: "Lussemburgo" },
  { code: "+353", country: "Irlanda" },
  { code: "+354", country: "Islanda" },
  { code: "+355", country: "Albania" },
  { code: "+356", country: "Malta" },
  { code: "+357", country: "Cipro" },
  { code: "+358", country: "Finlandia" },
  { code: "+359", country: "Bulgaria" },
  { code: "+370", country: "Lituania" },
  { code: "+371", country: "Lettonia" },
  { code: "+372", country: "Estonia" },
  { code: "+373", country: "Moldavia" },
  { code: "+374", country: "Armenia" },
  { code: "+375", country: "Bielorussia" },
  { code: "+376", country: "Andorra" },
  { code: "+377", country: "Monaco" },
  { code: "+378", country: "San Marino" },
  { code: "+379", country: "Città del Vaticano" },
  { code: "+380", country: "Ucraina" },
  { code: "+381", country: "Serbia" },
  { code: "+382", country: "Montenegro" },
  { code: "+385", country: "Croazia" },
  { code: "+386", country: "Slovenia" },
  { code: "+387", country: "Bosnia ed Erzegovina" },
  { code: "+389", country: "Macedonia del Nord" },
  { code: "+420", country: "Repubblica Ceca" },
  { code: "+421", country: "Slovacchia" },
  { code: "+423", country: "Liechtenstein" },
  { code: "+500", country: "Isole Falkland" },
  { code: "+501", country: "Belize" },
  { code: "+502", country: "Guatemala" },
  { code: "+503", country: "El Salvador" },
  { code: "+504", country: "Honduras" },
  { code: "+505", country: "Nicaragua" },
  { code: "+506", country: "Costa Rica" },
  { code: "+507", country: "Panama" },
  { code: "+508", country: "Saint-Pierre e Miquelon" },
  { code: "+509", country: "Haiti" },
  { code: "+590", country: "Guadalupa" },
  { code: "+591", country: "Bolivia" },
  { code: "+592", country: "Guyana" },
  { code: "+593", country: "Ecuador" },
  { code: "+594", country: "Guyana Francese" },
  { code: "+595", country: "Paraguay" },
  { code: "+596", country: "Martinica" },
  { code: "+597", country: "Suriname" },
  { code: "+598", country: "Uruguay" },
  { code: "+599", country: "Curaçao" },
  { code: "+670", country: "Timor Est" },
  { code: "+672", country: "Antartide" },
  { code: "+673", country: "Brunei" },
  { code: "+674", country: "Nauru" },
  { code: "+675", country: "Papua Nuova Guinea" },
  { code: "+676", country: "Tonga" },
  { code: "+677", country: "Isole Salomone" },
  { code: "+678", country: "Vanuatu" },
  { code: "+679", country: "Figi" },
  { code: "+680", country: "Palau" },
  { code: "+681", country: "Wallis e Futuna" },
  { code: "+682", country: "Isole Cook" },
  { code: "+683", country: "Niue" },
  { code: "+685", country: "Samoa" },
  { code: "+686", country: "Kiribati" },
  { code: "+687", country: "Nuova Caledonia" },
  { code: "+688", country: "Tuvalu" },
  { code: "+689", country: "Polinesia Francese" },
  { code: "+690", country: "Tokelau" },
  { code: "+691", country: "Micronesia" },
  { code: "+692", country: "Isole Marshall" },
  { code: "+850", country: "Corea del Nord" },
  { code: "+851", country: "Non assegnato" },
  { code: "+852", country: "Hong Kong" },
  { code: "+853", country: "Macao" },
  { code: "+855", country: "Cambogia" },
  { code: "+856", country: "Laos" },
  { code: "+870", country: "Servizi via satellite" },
  { code: "+880", country: "Bangladesh" },
  { code: "+886", country: "Taiwan" },
  { code: "+960", country: "Maldive" },
  { code: "+961", country: "Libano" },
  { code: "+962", country: "Giordania" },
  { code: "+963", country: "Siria" },
  { code: "+964", country: "Iraq" },
  { code: "+965", country: "Kuwait" },
  { code: "+966", country: "Arabia Saudita" },
  { code: "+967", country: "Yemen" },
  { code: "+968", country: "Oman" },
  { code: "+970", country: "Palestina" },
  { code: "+971", country: "Emirati Arabi Uniti" },
  { code: "+972", country: "Israele" },
  { code: "+973", country: "Bahrein" },
  { code: "+974", country: "Qatar" },
  { code: "+975", country: "Bhutan" },
  { code: "+976", country: "Mongolia" },
  { code: "+977", country: "Nepal" },
  { code: "+992", country: "Tagikistan" },
  { code: "+993", country: "Turkmenistan" },
  { code: "+994", country: "Azerbaigian" },
  { code: "+995", country: "Georgia" },
  { code: "+996", country: "Kirghizistan" },
  { code: "+998", country: "Uzbekistan" },
  // Puoi aggiungere ulteriori paesi se necessario
];

const customTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#590f18", // Colore della data selezionata
            color: "#fff",
            "&:hover": {
              backgroundColor: "#590f18", // Colore quando il mouse passa sopra
            },
          },
          "&.Mui-selected.MuiPickersDay-root": {
            backgroundColor: "#590f18", // Lo stesso colore selezionato, anche dopo il clic
            color: "#fff",
            "&:hover": {
              backgroundColor: "#590f18", // Non cambia quando il mouse è sopra
            },
          },
        },
      },
    },
  },
});

const TourBooking = () => {
  const [bikes, setBikes] = useState([]);
  const [tours, setTour] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // Stato iniziale del form con variabili per ogni campo
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    nationality: "",
    date: "",
    partecipants: "",
    privacyAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked ? [...formData[name], value] : formData[name].filter((v) => v !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    fetchBikes();
    fetchTour();
  }, []);

  const fetchBikes = () => {
    fetch(`${BASE_URL}/api/biciclette`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento delle biciclette");
        }
        return response.json();
      })
      .then((data) => setBikes(data))
      .catch((error) => console.error("Errore nel caricamento delle biciclette:", error));
  };

  const fetchTour = () => {
    fetch(`${BASE_URL}/api/tours`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento del tour");
        }
        return response.json();
      })
      .then((data) => setTour(data))
      .catch((error) => console.error("Errore nel caricamento del tour:", error));
  };

  return (
    <Container>
      <h1 className=" my-4" style={{ color: "#590f18", fontFamily: "Oswald, sans-serif", fontSize: "4em", fontWeight: 700 }}>
        PRENOTA UN TOUR!
      </h1>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
          {/* Campo Telefono con Prefisso */}
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <InputGroup>
                <Form.Control
                  as="select"
                  name="phonePrefix"
                  value={formData.phonePrefix}
                  onChange={handleChange}
                  required
                  style={{ Width: "100px" }} // Opzionale
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      ({country.country}) {country.code}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Città di residenza</Form.Label>
              <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group controlId="formNationality">
              <Form.Label>Nazionalità</Form.Label>
              <Form.Control as="select" name="nationality" value={formData.nationality} onChange={handleChange}>
                <option value="">Seleziona la tua nazionalità</option>
                {countryList.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} md={8} lg={4} xl={3}>
            <Form.Group>
              <Form.Label>Numero partecipanti</Form.Label>
              <Form.Control type="text" name="partecipants" value={formData.partecipants} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={12} md={8} lg={8} xl={8} className="p-3">
            <Row>
              <h2>Seleziona la tua Bicicletta</h2>

              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {bikes.map((bike) => (
                  <SwiperSlide>
                    <Col key={bike.id} xs={12}>
                      <Card className="border border-0">
                        <Card.Img variant="top" src={bike.imageUrl} alt={bike.modello} />
                        <Card.Body>
                          <Card.Title className="cardtitle text-center">{bike.modello}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
            <Row className="mt-3">
              <h2>Seleziona il tour desiderato</h2>

              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {tours.map((tour) => (
                  <SwiperSlide>
                    <Col key={tour.id} xs={12}>
                      <Card className="border border-0">
                        <Card.Img variant="top" src={tour.imageUrl} alt={tour.name} />
                        <Card.Body>
                          <Card.Title className="cardtitle text-center">{tour.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
          </Col>
          <Col xs={12} md={3} lg={3} xl={3} className="">
            <Row className="mt-3 mb-3">
              <Col xs={12} md={12} lg={12} xl={12}>
                <ThemeProvider theme={customTheme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <h2>Seleziona la data desiderata:</h2>
                    <StaticDatePicker displayStaticWrapperAs="desktop" value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
                  </LocalizationProvider>
                </ThemeProvider>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={<span style={{ fontSize: "12px" }}>Dichiaro di aver letto e compreso la politica della privacy.</span>}
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                required
              />
            </Form.Group>
            <Button type="submit">Invia</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TourBooking;
