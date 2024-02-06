import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-4 px-4 my-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-3 d-flex flex-column align-items-center bg-light w-75">
          <h2 className="text-center mb-2">MERN Authentication</h2>
          <p className="text-center mb-2">
            Boilerplate for MERN authentication using JWT, Redux Toolkit, and React Bootstrap
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" size="sm" className="me-2">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary" size="sm">
                Register
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
);
};

export default Hero;
