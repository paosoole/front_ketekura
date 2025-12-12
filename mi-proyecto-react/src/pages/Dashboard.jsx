// src/pages/Dashboard.jsx
import React from "react";
import { Container, Nav, Navbar, NavDropdown, Row, Col, Card } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div style={{ backgroundColor: "#e8d7ff", minHeight: "100vh" }}>

      {/* Navbar Fijo */}
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="/" style={{ color: "#6a1b9a", fontWeight: "700" }}>
            Clínica Ketecura
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" active>Dashboard</Nav.Link>
              <Nav.Link href="/pacientes">Pacientes</Nav.Link>
              <Nav.Link href="/medicos">Médicos</Nav.Link>
              <Nav.Link href="/atenciones">Atenciones</Nav.Link>

              <NavDropdown title="Más" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Reportes</NavDropdown.Item>
                <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* espacio para navbar */}
      <div style={{ paddingTop: "80px" }}></div>

      {/* CONTENIDO PRINCIPAL */}
      <Container className="pb-4">

        {/* TÍTULO */}
        <div className="text-center mb-4">
          <h1 style={{ color: "#6a1b9a", fontWeight: "700" }}>
            Dashboard General
          </h1>
          <p className="text-muted">Resumen de actividad de Clínica Ketecura</p>
        </div>

        {/* TARJETAS */}
        <Row className="g-4">

          {/* Pacientes */}
          <Col xs={12} md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-muted">Pacientes Registrados</h5>
                <div className="text-3xl fw-bold fs-1">—</div>
                <small className="text-muted">Total pacientes</small>
              </Card.Body>
            </Card>
          </Col>

          {/* Atenciones */}
          <Col xs={12} md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-muted">Atenciones Hoy</h5>
                <div className="text-3xl fw-bold fs-1">—</div>
                <small className="text-muted">Atenciones realizadas</small>
              </Card.Body>
            </Card>
          </Col>

          {/* Pagos */}
          <Col xs={12} md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="text-muted">Pagos Pendientes</h5>
                <div className="text-3xl fw-bold fs-1">—</div>
                <small className="text-muted">Monto pendiente</small>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* FOOTER */}
      <footer className="bg-light text-center text-muted py-3 mt-4 shadow-sm">
        <Container>
          <p className="mb-0">© 2025 Clínica Ketecura - Todos los derechos reservados</p>
          <small>Contacto: info@clinicaketecura.cl | +56 9 1234 5678</small>
        </Container>
      </footer>

    </div>
  );
}
