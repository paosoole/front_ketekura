// src/pages/PatientDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import Loader from '../components/ui/Loader'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function PatientDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load()
  }, [id])

  async function load() {
    try {
      setLoading(true)
      const p = await api.getPatient(id)
      setPatient(p)
      const r = await api.listRecipesByRut(id)
      setRecipes(r.data || r || [])
    } catch (err) {
      console.error(err)
      alert('Error cargando paciente')
    } finally {
      setLoading(false)
    }
  }

  if (loading || !patient) return <Loader />

  return (
    <div style={{ backgroundColor: '#e8d7ff', minHeight: '100vh' }}>
      {/* Navbar Fijo */}
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="#" style={{ color: '#6a1b9a', fontWeight: '700' }}>
            Clínica Ketecura
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link href="medicos">Medicos</Nav.Link>
              <Nav.Link href="atenciones">Atenciones</Nav.Link>
              <NavDropdown title="Más" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">Registrar Paciente</NavDropdown.Item>
                <NavDropdown.Item href="#">Reportes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Espacio para navbar fijo */}
      <div style={{ paddingTop: '80px' }}></div>

      {/* Contenedor principal */}
      <Container className="pb-4">
        {/* Información paciente y acciones */}
        <Card className="mb-4 shadow-sm">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h2 style={{ color: '#6a1b9a', fontWeight: '700' }}>
                {patient.fullName || `${patient.pnombre || ''} ${patient.apaterno || ''}`}
              </h2>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                RUT: {patient.pacRut || patient.id} - Tel: {patient.telefono}
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" disabled>
                Editar
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/recetas')}
                disabled
              >
                Ver recetas
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Recetas médicas */}
        <Card className="shadow-sm">
          <Card.Body>
            <h3 style={{ color: '#6a1b9a', fontWeight: '600' }}>Recetas médicas</h3>

            {recipes.length === 0 ? (
              <div className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                No hay recetas para este paciente.
              </div>
            ) : (
              <ul className="list-unstyled mt-3">
                {recipes.map(r => (
                  <li
                    key={r.id || r._id}
                    className="border rounded p-3 d-flex justify-content-between align-items-start mb-2"
                  >
                    <div>
                      <div style={{ fontWeight: '500' }}>{r.diagnostico || r.summary || r.type}</div>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                        {r.fecha_receta || r.date || ''} - ID: {r.id || r._id}
                      </div>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/recetas/${r.id || r._id}`)}
                    >
                      Ver
                    </Button>
                  </li>
                ))}
              </ul>
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
