import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
  return (
    <BaseLayout>
      Index page <Button color="danger">Danger!</Button>
    </BaseLayout>
  );
};

export default Index;
