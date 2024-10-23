import React from "react";
import TourManagement from "../AdminManagement/TourManagement";
import BikeManagement from "../AdminManagement/BikeManagement";
import BookingManagement from "../AdminManagement/BookingManagement";
import { Container, Tab, Tabs } from "react-bootstrap";

function AdminDashboard() {
  return (
    <Container className="mt-4">
      <h1>Dashboard Admin</h1>
      <Tabs defaultActiveKey="tour" id="admin-dashboard-tabs" className="mb-3">
        {/* Tab Gestione Tour */}
        <Tab eventKey="tour" title="Gestione Tour">
          <TourManagement />
        </Tab>

        {/* Tab Gestione Biciclette */}
        <Tab eventKey="bikes" title="Gestione Biciclette">
          <BikeManagement />
        </Tab>

        {/* Tab Gestione Prenotazioni */}
        <Tab eventKey="bookings" title="Gestione Prenotazioni">
          <BookingManagement />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminDashboard;
