import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import { Button, Container, Row, Col } from "reactstrap";

const Index = () => {
  return (
    <BaseLayout>
      <Container>
        <Row>
          <Col>
            Index page <Button color="warning">Danger!</Button>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default Index;
