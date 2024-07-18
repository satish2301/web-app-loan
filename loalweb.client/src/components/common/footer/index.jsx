import { Col, Row } from "antd";
import React from "react";

const Footer = () => {
  return (
    <footer className="dmt-footer">
      <Row className="justify-content-center">
        <Col span={24}>
          <span>© 2015-{new Date().getFullYear()}, Copyright</span>{" "}
          <a
            href="https://dialmytrip.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b className="text-D">DIAL</b>
            <b className="text-M">MY</b>
            <b className="text-T">TRIP</b>
          </a>{" "}
          <span>TECH PVT LTD. All rights reserved.</span>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
