import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import { Button, Container, Row, Col } from "reactstrap";

const Index = () => {
  return (
    <BaseLayout className="cover">
      <div className="main-section">
        {/* <div className="background-image">
          <img src="/static/images/background-index.png" />
        </div> */}

        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper`}>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Наши контакты </h2>
                      <div className="hero-section-content-intro">
                        <ul>
                          <li>
                            <h4>
                              Москва<span>+79530481401</span>{" "}
                            </h4>
                          </li>
                          <li>
                            <h4>
                              Екатеринбург<span>+79530481401</span>{" "}
                            </h4>
                          </li>
                        </ul>
                      </div>
                      <h4>
                        Welcome to the portfolio website of Filip Jerga. Get
                        informed, collaborate and discover projects I was
                        working on through the years!
                      </h4>
                    </div>
                    {/* <img className="image" src="/static/images/section-1.png" /> */}
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h4>
                  Welcome to the portfolio website of Filip Jerga. Get informed,
                  collaborate and discover projects I was working on through the
                  years!
                </h4>
              </div>
              <div className="hero-welcome-bio">
                <h1>Let's take a look on my work.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Index;
