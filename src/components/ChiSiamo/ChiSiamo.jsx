import "./ChiSiamo.css";
import { Col, Container, Row } from "react-bootstrap";
import Mirko from "../../asset/img/Mirko.jpg";
import Facebook from "../../asset/img/facebook.png";
import Instagram from "../../asset/img/instagram.png";
import TikTok from "../../asset/img/tiktok.png";

function ChiSiamo() {
  return (
    <Container className="chisiamo-container">
      <Row className="mt-5 ">
        <Col xs={6} className="d-flex justify-content-center">
          <div className="text-center">
            <img src={Mirko} alt="Mirko Foto" className="bordo rounded-circle" />
            <div className="mt-1">
              {" "}
              <a href="https://www.facebook.com/mirko.deleonardis.7?locale=it_IT">
                <img src={Facebook} alt="Mirko Foto" className="" />
              </a>
              <a href="https://www.instagram.com/zonaa46/">
                <img src={Instagram} alt="Mirko Foto" className="" />
              </a>
              <a href="https://www.tiktok.com/login?redirect_url=https%3A%2F%2Fwww.tiktok.com%2Fit-IT%2F&lang=en&enter_method=mandatorynpm">
                <img src={TikTok} alt="Mirko Foto" className="" />
              </a>
            </div>
          </div>
        </Col>
        <Col xs={6} className="d-flex justify-content-center">
          <div>
            <h1 className="chisiamo_title">CASHUBOLI, NEL CUORE DELLA PUGLIA</h1>
            <br />
            <p className="chisiamo_paragraph mb-3">
              Benvenuti nel mondo di Cashuboli, dove il viaggio diventa un’esperienza inclusiva e indimenticabile. Fondata nel 2023 da Mirko De Leonardis,
              questa realtà pugliese prende il suo nome dalla storica contrada Casabolicchio di Noci, luogo in cui sorge la nostra impresa. In questo piccolo
              angolo di Puglia, immerso tra natura incontaminata e tradizioni millenarie, nasce Cashuboli, un progetto che ha l’ambizione di diventare un punto
              di riferimento per il turismo accessibile e sostenibile, offrendo a tutti la possibilità di scoprire le meraviglie del nostro territorio. La
              nostra sede, una pittoresca masseria dalla facciata rossa, è il cuore pulsante di un'idea che mira a molto di più di un semplice servizio di
              noleggio e-bike. Cashuboli è un hub turistico dove chiunque può sentirsi a casa e godersi una pausa rigenerante, lontano dal caos, per riscoprire
              il piacere della natura. Qui, nel cuore della Puglia, tra le colline della Valle d'Itria e la bellezza della costa adriatica, ogni pedalata
              diventa un'opportunità per vivere il territorio in modo autentico.
              <br />
              <br />
              Il nostro obiettivo è chiaro: superare ogni barriera. La nostra flotta di e-bike è progettata per essere accessibile a tutti, indipendentemente
              dall’età o dalle capacità fisiche. Bambini, anziani e persone con disabilità possono tutti vivere l'emozione di esplorare la Puglia su due ruote,
              grazie alle nostre soluzioni personalizzate e inclusive. Crediamo che la mobilità debba essere un diritto di tutti e che la bellezza del nostro
              paesaggio possa essere apprezzata da chiunque, senza eccezioni.
              <br />
              <br />
              Ma la nostra visione va oltre. In un mondo in cui spesso si pensa che sia necessario costruire nuove infrastrutture per innovare, noi di Cashuboli
              crediamo fermamente nel valore del riutilizzo e della valorizzazione di ciò che già esiste. Non serve creare, ma piuttosto organizzare meglio. La
              Puglia ha già tutto: paesaggi mozzafiato, strade panoramiche e una cultura accogliente. Il nostro compito è solo quello di offrire servizi che
              rendano ogni viaggio unico e su misura, prestando attenzione ai dettagli e alle esigenze di ciascun visitatore.
              <br />
              <br />
              Offriamo un servizio flessibile e personalizzato: che tu voglia affrontare un breve giro nelle campagne circostanti o un'avventura più lunga lungo
              la costa, Cashuboli è qui per offrirti soluzioni su misura. Il nostro team è pronto a consigliarti il percorso più adatto alle tue esigenze,
              aiutandoti a pianificare al meglio la tua esperienza, così che ogni istante trascorso con noi sia all'altezza delle tue aspettative.
              <br />
              <br />
              Siamo fieri di fare la differenza, non solo come imprenditori, ma come ambasciatori del territorio. Ogni tour organizzato da Cashuboli è
              un’occasione per promuovere il turismo sostenibile, rispettando l’ambiente e coinvolgendo la comunità locale. Ci impegniamo a mantenere intatto il
              patrimonio naturale e culturale della nostra terra, collaborando con partner locali per offrire esperienze autentiche, senza impattare
              negativamente sul territorio.
              <br />
              <br />
              Unisciti a noi in questa avventura. Scegli Cashuboli e scopri la Puglia in un modo nuovo: lento, sostenibile e accessibile a tutti. Ogni pedalata
              sarà un passo verso una scoperta, ogni percorso una nuova storia da raccontare. La libertà ti aspetta, a bordo di una e-bike, con Cashuboli!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChiSiamo;
