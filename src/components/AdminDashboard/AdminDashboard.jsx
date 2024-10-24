import React, { useState } from "react";
import TourManagement from "../AdminManagement/TourManagement";
import BikeManagement from "../AdminManagement/BikeManagement";
import BookingManagement from "../AdminManagement/BookingManagement";
import { Container, Tab, Tabs } from "react-bootstrap";

function AdminDashboard() {
  const [key, setKey] = useState("tour"); // Imposta la tab iniziale

  return (
    <Container>
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>

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
    </Container>
  );
}
export default AdminDashboard;
