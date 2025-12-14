import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
//import { useEffect } from 'react'

export default function CreatePatient() {
  const navigate = useNavigate()
  const [patient, setPatient] = useState({
    pac_run: '',        // RUT
    dv_run: '',         // Dígito verificador
    pnombre: '',        // Primer nombre
    snombre: '',        // Segundo nombre
    apaterno: '',       // Apellido paterno
    amaterno: '',       // Apellido materno
    fecha_nacimiento: '', // Fecha de nacimiento
    telefono: '',       // Teléfono
    salud: {
        sal_id: ''},         // ID de salud (asegurado como sal_id)
  })

  // const [saluds, setSaluds] = useState([])

  //   useEffect(() => {
  //   const fetchSaluds = async () => {
  //     try {
  //     const response = await api.getSaluds();
  //     setSaluds(response.data);
  //     } catch (error) {
  //       console.error('Error al cargar los seguros de salud:', error);
  //     }
  //   };
  //   fetchSaluds();
  // }, []);

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'sal_id') {
    setPatient({
      ...patient,
      salud: { ...patient.salud, sal_id: value }  // Actualizamos solo sal_id dentro de 'salud'
    });
  } else {
    setPatient({ ...patient, [name]: value });
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await api.crearPaciente(patient)  
      alert('Paciente creado con éxito')
      navigate('/pacientes')  
    } catch (error) {
      console.error(error)
      alert('Error creando paciente')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: "#e8d7ff", minHeight: "100vh" }}>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center" style={{ color: "#6a1b9a" }}>Registrar Paciente</h3>
                <Form onSubmit={handleSubmit}>
                  {/* RUT */}
                  <Form.Group className="mb-3">
                    <Form.Label>RUT</Form.Label>
                    <Form.Control
                      type="number"  // Cambié a "number" para asegurar que sea un número
                      name="pac_run"
                      value={patient.pac_run}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Dígito Verificador */}
                  <Form.Group className="mb-3">
                    <Form.Label>Dígito Verificador</Form.Label>
                    <Form.Control
                      type="text"
                      name="dv_run"
                      value={patient.dv_run}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Primer Nombre */}
                  <Form.Group className="mb-3">
                    <Form.Label>Primer Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="pnombre"
                      value={patient.pnombre}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Segundo Nombre */}
                  <Form.Group className="mb-3">
                    <Form.Label>Segundo Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="snombre"
                      value={patient.snombre}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Apellido Paterno */}
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control
                      type="text"
                      name="apaterno"
                      value={patient.apaterno}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Apellido Materno */}
                  <Form.Group className="mb-3">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control
                      type="text"
                      name="amaterno"
                      value={patient.amaterno}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Fecha de Nacimiento */}
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha_nacimiento"
                      value={patient.fecha_nacimiento}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* Teléfono */}
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefono"
                      value={patient.telefono}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  {/* ID de Salud (sal_id) */}
                    <Form.Group className="mb-3">
                    <Form.Label>ID de Salud</Form.Label>
                    <Form.Control
                      type="number"
                      name="sal_id"  // Esto se mantendrá como 'sal_id'
                      value={patient.salud.sal_id || ''}  // Asegúrate de que se tome el valor correcto desde `patient.salud.sal_id`
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3">
                    <Form.Label>ID de Salud</Form.Label>
                    <Form.Control
                      type="number"  // Cambié a "number" para asegurar que sea un número
                      name="sal_id"
                      value={patient.sal_id}
                      onChange={handleChange}
                      required
                    />
                  
                  </Form.Group> */}

                  {/* Botón de Enviar */}
                  <Button
                    type="submit"
                    className="w-100"
                    style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
                    disabled={loading}
                  >
                    {loading ? 'Creando...' : 'Crear Paciente'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
