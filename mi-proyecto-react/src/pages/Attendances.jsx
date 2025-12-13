// src/pages/Attendances.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/ui/DataTable'
import Loader from '../components/ui/Loader'
import { api } from '../api'
import { Container, Nav, Navbar, NavDropdown, Row, Col, Card, Button } from 'react-bootstrap'

export default function Attendances() {
  const [attendances, setAttendances] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => { load() }, [])

  async function load() {
    try {
      setLoading(true)
      const res = await api.listAttendances({ page: 1, limit: 50 })
      setAttendances(res.data || [])
    } catch (e) {
      console.error(e)
      alert('Error cargando atenciones')
    } finally {
      setLoading(false)
    }
  }

  const cols = [
    { key: 'id', title: 'ID' },
    { key: 'date', title: 'Fecha', render: r => new Date(r.date).toLocaleString() },
    { key: 'patientName', title: 'Paciente', render: r => r.patientName || r.patient?.fullName },
    { key: 'doctorName', title: 'Médico', render: r => r.doctorName || r.doctor?.fullName },
    { key: 'notes', title: 'Notas' }
  ]

  return (
    <div id="atenciones" style={{ backgroundColor: "#e8d7ff", minHeight: "100vh" }}>

      {/* Navbar Fijo */}
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="#" style={{ color: "#6a1b9a", fontWeight: "700" }}>
            Clínica Ketecura
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Dashboard">Home</Nav.Link>
              <Nav.Link href="/medicos">Medicos</Nav.Link>
              <Nav.Link href="/atenciones" active>Atenciones</Nav.Link>
              <NavDropdown title="Más" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Registrar Atención</NavDropdown.Item>
                <NavDropdown.Item href="#">Reportes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Espacio para navbar fijo */}
      <div style={{ paddingTop: "80px" }}></div>

      {/* Contenedor Principal */}
      <Container className="pb-4">

        {/* Título de sección */}
        <div className="text-center mb-4">
          <h1 style={{ color: "#6a1b9a", fontWeight: "700" }}>Atenciones</h1>
          <p className="text-muted">Historial de atenciones (incluye datos en MongoDB cuando aplique).</p>
        </div>

        {/* Buscador */}
        <Row className="mb-4">
          <Col xs={12} md={8} className="mb-2 mb-md-0">
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="form-control"
              placeholder="Buscar por paciente, médico o ID..."
            />
          </Col>
          <Col xs={12} md={4}>
            <Button
              className="w-100 w-md-auto"
              onClick={load}
              style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
            >
              Buscar
            </Button>
          </Col>
        </Row>

        {/* Tabla dentro de Card */}
        <Card className="shadow-sm">
          <Card.Body>
            {loading ? (
              <div className="text-center py-5">
                <Loader />
              </div>
            ) : (
              <div className="table-responsive">
                <DataTable
                  columns={cols}
                  data={attendances}
                  onRowClick={(r) => navigate(`/atenciones/${r.id}`)}
                />
              </div>
            )}
          </Card.Body>
        </Card>

      </Container>

      {/* Footer */}
      <footer className="bg-light text-center text-muted py-3 mt-4 shadow-sm">
        <Container>
          <p className="mb-0">© 2025 Clínica Ketecura - Todos los derechos reservados</p>
          <small>Contacto: info@clinicaketecura.cl | +56 9 1234 5678</small>
        </Container>
      </footer>
    </div>
  )
}
