import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/ui/DataTable'
import Loader from '../components/ui/Loader'
import { api } from '../api'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => { load() }, [])

  async function load() {
    try {
      setLoading(true)
      const res = await api.listRecipes()
      setRecipes(res.data || res || [])
    } catch (e) {
      console.error(e)
      alert('Error cargando recetas')
    } finally {
      setLoading(false)
    }
  }

  const cols = [
    { key: 'id', title: 'ID', render: r => r.id || r._id },
    { key: 'fecha_receta', title: 'Fecha', render: r => r.fecha_receta || r.date },
    { key: 'pacRut', title: 'Paciente', render: r => r.pacRut || r.patientId },
    { key: 'diagnostico', title: 'Diagnóstico' }
  ]

  return (
    <div style={{ backgroundColor: "#e8d7ff", minHeight: "100vh" }}>

      {/* Navbar fijo */}
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand style={{ color: "#6a1b9a", fontWeight: "700" }}>
            Clínica Ketecura
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/pacientes">Pacientes</Nav.Link>
              <Nav.Link href="/medicos">Médicos</Nav.Link>
              <Nav.Link href="/atenciones">Atenciones</Nav.Link>
              <NavDropdown title="Más" id="basic-nav-dropdown">
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

      {/* Contenedor principal */}
      <Container className="pb-4">

        {/* Título sección */}
        <div className="text-center mb-4">
          <h1 style={{ color: "#6a1b9a", fontWeight: "700" }}>Recetas Médicas</h1>
          <p className="text-muted">Listado de recetas almacenadas</p>
        </div>

        {/* Buscador */}
        <Row className="mb-4">
          <Col xs={12} md={8} className="mb-2 mb-md-0">
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="form-control"
              placeholder="Buscar por paciente, diagnóstico o fecha..."
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
                  data={recipes}
                  onRowClick={r => navigate(`/recetas/${r.id || r._id}`)}
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
