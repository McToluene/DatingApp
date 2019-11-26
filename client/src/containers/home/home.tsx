import React, { FC, CSSProperties, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Register from "../../components/register/register";

const Home: FC = () => {
  const [registerMode, setRegisterMode] = useState(false);

  const styles: CSSProperties = {
    textAlign: "center"
  };

  const handleOnCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRegisterMode(false);
  };

  let displayContent;
  if (!registerMode) {
    displayContent = (
      <div style={styles}>
        <h1>Find your match</h1>
        <p className="lead">
          Come on in to view your matches... All you need to do is sign up!
        </p>
        <div className="text-center">
          <Button
            className="rounded-0 mr-2"
            size="lg"
            variant="primary"
            onClick={() => setRegisterMode(true)}
          >
            Register
          </Button>
          <Button className="rounded-0" size="lg" variant="info">
            Learn more
          </Button>
        </div>
      </div>
    );
  } else {
    displayContent = (
      <Container>
        <Row className="justify-content-center">
          <Col md="4">
            <Register onCancel={handleOnCancel} />
          </Col>
        </Row>
      </Container>
    );
  }

  return <Container className="mt-5">{displayContent}</Container>;
};

export default Home;
