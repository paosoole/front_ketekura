// src/pages/Doctors.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/ui/DataTable'
import Loader from '../components/ui/Loader'
import { api } from '../api'
import Dashboard from './Dashboard'
import { Container, Nav, Navbar, NavDropdown, Row, Col, Card, Button } from 'react-bootstrap'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => { load() }, [])

  async function load() {
    try {
      setLoading(true)
      const res = await api.listDoctors()
      setDoctors(res.data || res || [])
    } catch (e) {
      console.error(e)
      alert('Error cargando médicos')
    } finally {
      setLoading(false)
    }
  }

  const cols = [
    { key: 'medRut', title: 'RUT', render: r => r.medRut || r.id },
    { key: 'fullName', title: 'Nombre', render: r => r.fullName || `${r.pnombre || ''} ${r.apaterno || ''}` },
    { key: 'telefono', title: 'Teléfono' }
  ]

  return (
    <div id="medicos"style={{ backgroundColor: "#e8d7ff", minHeight: "100vh" }}>

      {/* Navbar Fijo */}
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="#" style={{ color: "#6a1b9a", fontWeight: "700" }}>
            Clínica Ketecura
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" >Home</Nav.Link>
              <Nav.Link href="/medicos" active>Medicos</Nav.Link>
              <Nav.Link href="/atenciones">Atenciones</Nav.Link>
              <NavDropdown title="Más" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Registrar Médico</NavDropdown.Item>
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
          <h1 style={{ color: "#6a1b9a", fontWeight: "700" }}>Médicos</h1>
          <p className="text-muted">Profesionales registrados</p>
        </div>

        {/* Buscador */}
        <Row className="mb-4">
          <Col xs={12} md={8} className="mb-2 mb-md-0">
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="form-control"
              placeholder="Buscar por nombre o RUT..."
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
                  data={doctors}
                  onRowClick={(r) => navigate(`/medicos/${r.medRut || r.id}`)}
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
