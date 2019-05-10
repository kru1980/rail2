import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/layout/BasePage";
import { Button, Container, Row, Col } from "reactstrap";

const About = props => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage className="about-page">About page</BasePage>
    </BaseLayout>
  );
};

export default About;
