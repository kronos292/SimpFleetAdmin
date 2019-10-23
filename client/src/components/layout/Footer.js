import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faLinkedin,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";

import MediaQuery from "react-responsive";

import "./Footer.css";
export default function Footer() {
  return (
    <div id="footer-div">
      <div className="section-footer">
        <Container>
          <Row className="nav-btm">
            <Col xs={6} md={{ span: 3, offset: 0 }}>
              <Nav defaultActiveKey="#home" className="flex-column">
                <Nav.Link className="disabled title-footer">Company</Nav.Link>
                <Nav.Link
                  href="https://www.shipsuppliesdirect.com/"
                  target="_blank"
                >
                  About Ship Supplies Direct
                </Nav.Link>
                <Nav.Link href="https://medium.com/@shipsuppliesdirect">
                  Blog
                </Nav.Link>
                <Nav.Link href="/">Press</Nav.Link>
              </Nav>
            </Col>
            {/*<Col xs={6} md={{ span: 3, offset: 0 }}>*/}
            {/*    <Nav defaultActiveKey="#home" className="flex-column">*/}
            {/*        <Nav.Link className='disabled title-footer'>SimpFleet</Nav.Link>*/}
            {/*        <Nav.Link href="/" target="_blank">FAQ</Nav.Link>*/}
            {/*        <Nav.Link href="/" target="_blank">Career</Nav.Link>*/}
            {/*    </Nav>*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <hr className="line-footer" />
          </Row>
          <MediaQuery query="(min-width: 426px)">
            <Row className="font-large">
              <Col>
                <h6 className="h6-footer">©2019 Ship Supplies Direct</h6>
              </Col>
              <Col
                md={{ span: 3, offset: 0 }}
                className="d-flex justify-content-end align-items-start"
              >
                <a
                  href="https://api.whatsapp.com/send?phone=6587480467"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    color="white"
                    className="highlight"
                  />
                </a>
                <a
                  href="https://www.facebook.com/SimpFleet-2427717804140333/"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    color="white"
                    className="highlight"
                  />
                </a>
                <a
                  href="https://www.instagram.com/shipsuppliesdirect/"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    color="white"
                    className="highlight"
                  />
                </a>
                {/*<a href='#home' target='_blank' className='sicon'><FontAwesomeIcon icon={faWeixin} color="white" className='highlight'/></a>*/}
                <a
                  href="https://www.linkedin.com/company/ship-supplies-direct/"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    color="white"
                    className="highlight"
                  />
                </a>
                <a
                  href="https://telegram.me/ShipSuppliesDirect"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faTelegram}
                    color="white"
                    className="highlight"
                  />
                </a>
              </Col>
            </Row>
          </MediaQuery>
          <MediaQuery query="(max-width: 425px)">
            <Row className="font-large">
              <Col className="d-flex justify-content-center align-items-start">
                <h6 className="h6-footer">©2019 Ship Supplies Direct</h6>
              </Col>
            </Row>
            <Row className="font-large">
              <Col className="d-flex justify-content-center align-items-start">
                <a
                  href="https://api.whatsapp.com/send?phone=6587480467"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    color="white"
                    className="highlight"
                  />
                </a>
                <a
                  href="https://www.facebook.com/SimpFleet-2427717804140333/"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    color="white"
                    className="highlight"
                  />
                </a>
                <a
                  href="https://www.instagram.com/shipsuppliesdirect/"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    color="white"
                    className="highlight"
                  />
                </a>
                {/*<a href='#home' target='_blank' className='sicon'><FontAwesomeIcon icon={faWeixin} color="white" className='highlight' /></a>*/}
                <a
                  href="https://www.linkedin.com/company/ship-supplies-direct/"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    color="white"
                    className="highlight"
                  />
                </a>
                <a
                  href="https://telegram.me/ShipSuppliesDirect"
                  target="_blank"
                  className="sicon"
                >
                  <FontAwesomeIcon
                    icon={faTelegram}
                    color="white"
                    className="highlight"
                  />
                </a>
              </Col>
            </Row>
          </MediaQuery>
        </Container>
      </div>
    </div>
  );
}
