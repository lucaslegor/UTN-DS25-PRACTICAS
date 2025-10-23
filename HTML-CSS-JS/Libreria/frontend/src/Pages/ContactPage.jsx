import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { Envelope, Telephone, GeoAlt } from "react-bootstrap-icons"
import "../styles/ContactPage.css"

const ContactPage = () => {
  return (
    <Container className="contact-page">
      <h2 className="text-center my-4">Contacto</h2>
      <Row>
        <Col md={5} className="contact-info mb-4">
          <h3>Información de Contacto</h3>
          <div className="contact-item">
            <GeoAlt size={24} />
            <div>
              <h5>Dirección</h5>
              <p>Avenida 13, C.62, La Plata</p>
            </div>
          </div>

          <div className="contact-item">
            <Telephone size={24} />
            <div>
              <h5>Teléfono</h5>
              <p>1234-5678</p>
            </div>
          </div>

          <div className="contact-item">
            <Envelope size={24} />
            <div>
              <h5>Email</h5>
              <p>lucas@gmail.com</p>
            </div>
          </div>
        </Col>

        <Col md={7}>
          <h3 className="msg">Envíanos un Mensaje</h3>
          <Form className="contact-form">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={5} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ContactPage