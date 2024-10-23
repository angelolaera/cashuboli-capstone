import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Header/Header.css";
import "./components/Navbar/Navbar.css";
import "./components/Bici/Bici.css";
import Header from "./components/Header/Header";
import BarraNavigazione from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ChiSiamo from "./components/ChiSiamo/ChiSiamo";
import Bici from "./components/Bici/Bici";
import TourMasserie from "./components/Tour/TourMasserie";
import TourValleDitria from "./components/Tour/TourValleDitria";
import TourAlberobello from "./components/Tour/TourAlberobello";
import CheckoutPage from "./components/CheckoutPage/CheckOut";
import TourBooking from "./components/CalendarioBooking/TourBooking";
import Return from "./components/Return/Return";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <BarraNavigazione />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chisiamo" element={<ChiSiamo />} />
          <Route path="/bici" element={<Bici />} />
          <Route path="/tourmasserie" element={<TourMasserie />} />
          <Route path="/tourvalleditria" element={<TourValleDitria />} />
          <Route path="/touralberobello" element={<TourAlberobello />} />
          <Route path="/tourbooking" element={<TourBooking />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/return" element={<Return />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <p className="copyrightAngelo text-center">© Copyright - Angelo Laera</p>
      </>
    </BrowserRouter>
  );
}

export default App;
