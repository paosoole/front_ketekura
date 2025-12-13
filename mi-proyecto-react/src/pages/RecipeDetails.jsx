// src/pages/RecipeDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import Loader from '../components/ui/Loader'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load()
  }, [id])

  async function load() {
    try {
      setLoading(true)
      const res = await api.recipeDetails(id)
      setData(res)
    } catch (e) {
      console.error(e)
      alert('Error cargando receta')
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) return (
    <div style={{ backgroundColor: '#e8d7ff', minHeight: '100vh' }}>
      <Loader />
    </div>
  )

  return (
    <div id="receta-detalle" style={{ backgroundColor: '#e8d7ff', minHeight: '100vh' }}>
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
        {/* Header receta */}
        <Card className="mb-4 shadow-sm">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h2 style={{ color: '#6a1b9a', fontWeight: '700' }}>
                Receta #{data.id || data._id}
              </h2>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                Paciente: {data.paciente?.fullName || data.paciente?.pnombre || data.pacRut || '—'}
              </div>
              <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                Médico: {data.medico?.fullName || data.medico?.pnombre || data.medicoRut || '—'}
              </div>
              {data.fecha_receta && (
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                  Fecha: {data.fecha_receta}
                </div>
              )}
            </div>
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              Volver
            </Button>
          </Card.Body>
        </Card>

        {/* Diagnóstico */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h3 style={{ color: '#6a1b9a', fontWeight: '600' }}>Diagnóstico</h3>
            <div className="text-muted" style={{ fontSize: '1rem' }}>
              {data.diagnostico || 'Sin diagnóstico registrado'}
            </div>
          </Card.Body>
        </Card>

        {/* Medicamentos */}
        <Card className="shadow-sm">
          <Card.Body>
            <h3 style={{ color: '#6a1b9a', fontWeight: '600' }}>Medicamentos</h3>
            {!data.medicamentos || data.medicamentos.length === 0 ? (
              <div className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                No hay medicamentos asociados a esta receta.
              </div>
            ) : (
              <ul className="list-unstyled mt-3">
                {data.medicamentos.map((m, i) => (
                  <li
                    key={i}
                    className="border rounded p-3 mb-2"
                  >
                    <div style={{ fontWeight: '500', fontSize: '1rem' }}>
                      {m.nombre}
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                      Dosis: {m.dosis || '—'} • Frecuencia: {m.frecuencia || '—'} • Duración: {m.duracion || '—'}
                    </div>
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
