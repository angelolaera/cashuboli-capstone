import React, { useState } from "react";
import TourManagement from "../AdminManagement/TourManagement";
import BikeManagement from "../AdminManagement/BikeManagement";
import BookingManagement from "../AdminManagement/BookingManagement";
import { Container, Tab, Tabs } from "react-bootstrap";

function AdminDashboard() {
  const [key, setKey] = useState("tour"); // Imposta la tab iniziale

  return (
    <div className="admin-page p-3">
      <h2 className="admin-title my-4">Admin Dashboard</h2>

      <Tabs id="admin-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="tour" title="Gestisci Tour">
          <TourManagement />
        </Tab>
        <Tab eventKey="bike" title="Gestisci Biciclette">
          <BikeManagement />
        </Tab>
        <Tab eventKey="booking" title="Gestisci Prenotazioni">
          <BookingManagement />
        </Tab>
      </Tabs>
    </div>
  );
}
export default AdminDashboard;
