import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/ui/DataTable'
import Loader from '../components/ui/Loader'
import { api } from '../api'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//import Footer from '../components/ui/Footer'; // si quieres crear un componente Footer aparte

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => { load() }, [q]);

  async function load() {
    try {
      setLoading(true)
      const res= await api.listPatients();
      setPatients(res.data || res || [])
    } catch (e) {
      console.error(e)
      alert('Error cargando pacientes')
    } finally {
      setLoading(false)
    }
  }

  // Función para filtrar pacientes de acuerdo al texto de búsqueda
  const filterPatients = (patients) => {
    return patients.filter(patient => {
      const fullName = patient.fullName || '';  // Asegurarse de que `fullName` no sea `undefined` ni `null`
      const pacRut = patient.pacRut ? patient.pacRut.toString() : '';      // Asegurarse de que `pacRut` no sea `undefined` ni `null`
      
      return fullName.toLowerCase().includes(q.toLowerCase()) || pacRut.includes(q);
    });
  };

// Definición de las columnas de la grilla
  const cols = [
    { key: 'id', title: 'RUT', render: r => r.pacRut || r.id },
    { key: 'fullName', title: 'Nombre', render: r => r.fullName || `${r.pnombre || ''} ${r.apaterno || ''}` },
    { key: 'telefono', title: 'Teléfono' }
  ]

  return (
    <div style={{ backgroundColor: "#e8d7ff", minHeight: "100vh" }}>

      {/* Navbar Fijo */}
      <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="#" style={{ color: "#6a1b9a", fontWeight: "700" }}>
            Clínica Ketecura
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard" active>Home</Nav.Link>
              <Nav.Link href="medicos">Medicos</Nav.Link>
              <Nav.Link href="/recetas/detalle/">Recetas</Nav.Link>
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
      <div style={{ paddingTop: "80px" }}></div>

      {/* Contenedor Principal */}
      <Container className="pb-4">

        {/* Título de sección */}
        <div className="text-center mb-4">
          <h1 style={{ color: "#6a1b9a", fontWeight: "700" }}>Pacientes</h1>
          <p className="text-muted">Lista de pacientes registrados</p>
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
            
            {/* Botones en fila */}
            <Col xs={12} md={4} className="d-flex justify-content-between">
              <Button
                className="w-auto"
                onClick={load}
                style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
              >
                Buscar
              </Button>
              <Button
                className="w-auto"
                onClick={() => navigate('/crear-paciente')}
                style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
              >
                Crear Paciente
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
                  data={filterPatients(patients)}
                  onRowClick={(r) => navigate(`/pacientes/${r.pacRut || r.id}`)}
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
