import { Container,Row,Col } from "react-bootstrap"

// eslint-disable-next-line react/prop-types
const FormContainer = ({children}) => {
  return (
    <Container>
        <Row className="justify-content-md-center mt-5">
            <Col xs={6} md={6} lg={4} className="card p-5">
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer