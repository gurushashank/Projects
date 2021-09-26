import React from "react";
import { Col, Card, Row, Container, Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import { GeoAltFill, PhoneFill, EnvelopeFill } from "react-bootstrap-icons";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const StyledCard = styled(Card)`
  width: auto;
  height: auto;
  box-shadow: 0 0 8px 0 rgba(100, 100, 100, 0.25);
  margin: 30px 5px 50px 5px;
  padding: 30px;

  & .row {
    margin: 10px 0px;
  }
`;

const PageHeader = styled(Jumbotron)`
  background-color: #dedede;
  width: 100%;
`;

function Contact() {
  return (
    <React.Fragment>
      <Navbar />

      <PageHeader>
        <Container>
          <h2 className="text-center">Contact Us</h2>
        </Container>
      </PageHeader>
      <Container>
        <Row>
          <Col xs="12" md="6">
            <StyledCard>
              <h3 className="text-center">Business Queries</h3>
              <p className="text-center text-muted mb-2">
                Do you want to talk to us about advertisements or bunsiness
                related queries?
              </p>
              <Row>
                <Col xs="3">
                  <GeoAltFill
                    className="text-right"
                    color="#d0312d"
                    size={30}
                  />
                </Col>
                <Col xs="9">
                  <p className="text-left">
                    112 /a Mohamedi House, Mohamedi Ali Road, Mandvi, Mumbai,
                    Maharastra
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <PhoneFill
                    className="text-center"
                    color="#d0312d"
                    size={30}
                  />
                </Col>
                <Col xs="9">
                  <p className="text-left">+91-223400980</p>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <EnvelopeFill
                    className="text-center"
                    color="#d0312d"
                    size={30}
                  />
                </Col>
                <Col xs="9">
                  <p className="text-left">Business@anaha.com</p>
                </Col>
              </Row>
            </StyledCard>
          </Col>
          <Col xs="12" md="6">
            <StyledCard>
              <h3 className="text-center">Product Support</h3>
              <p className="text-center text-muted mb-2">
                Do you want to talk to us about product grievances? Write to us
                and we will solve your issue!
              </p>
              <Row>
                <Col xs="3">
                  <GeoAltFill
                    className="text-right"
                    color="#d0312d"
                    size={30}
                  />
                </Col>
                <Col xs="9">
                  <p className="text-left">
                    112 /a Mohamedi House, Mohamedi Ali Road, Mandvi, Mumbai,
                    Maharastra
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <PhoneFill
                    className="text-center"
                    color="#d0312d"
                    size={30}
                  />
                </Col>
                <Col xs="9">
                  <p className="text-left">+91-963000980, +91-8775744432</p>
                </Col>
              </Row>
              <Row>
                <Col xs="3">
                  <EnvelopeFill
                    className="text-center"
                    color="#d0312d"
                    size={30}
                  />
                </Col>
                <Col xs="9">
                  <p className="text-left">support@anaha.com</p>
                </Col>
              </Row>
            </StyledCard>
          </Col>
        </Row>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default Contact;
