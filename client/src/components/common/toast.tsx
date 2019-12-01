import React, { useState } from "react";
import { Row, Col, Toast } from "react-bootstrap";

interface ICustomToast {
  header: string;
  content: string;
  setToastShow: boolean;
}

const CustomToast: React.FC<ICustomToast> = ({
  header,
  content,
  setToastShow
}) => {
  const [show, setShow] = useState(false);
  return (
    <Row>
      <Col xs={6}>
        <Toast
          onClose={() => setShow(setToastShow)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{header}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{content}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default CustomToast;
