import React, { FC, ChangeEvent, FormEvent } from "react";
import { Form, FormControl, Button, FormGroup, Col } from "react-bootstrap";

import "./login.css";
import IUser from "../../model/IUser";

interface ILoginProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  validated: boolean;
  user: IUser;
  onChangeHandle: (event: FormEvent<HTMLFormElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Login: FC<ILoginProps> = ({
  handleSubmit,
  validated,
  onChangeHandle,
  onInputChange,
  user
}) => {
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      onChange={onChangeHandle}
    >
      <Form.Row>
        <Form.Group
          as={Col}
          md="5"
          className="mb-0"
          controlId="validationCustomUsername"
        >
          <FormControl
            required
            size="sm"
            type="text"
            placeholder="Username"
            className="rounded-0 mr-sm-2"
            onChange={onInputChange}
            name="username"
            value={user.username}
          />
          <Form.Control.Feedback type="invalid" className="feedback">
            Please provide a username
          </Form.Control.Feedback>
        </Form.Group>
        <FormGroup
          as={Col}
          md="5"
          className="mb-0"
          controlId="validationCustomPassword"
        >
          <FormControl
            required
            size="sm"
            type="password"
            placeholder="Password"
            className="rounded-0 mr-sm-2"
            onChange={onInputChange}
            // onChange={(event: ChangeEvent<HTMLInputElement>) =>
            //   setPassword(event.target.value)
            // }
            name="password"
            value={user.password}
          />
          <Form.Control.Feedback type="invalid" className="feedback">
            Please provide a password
          </Form.Control.Feedback>
        </FormGroup>
        <Col md="2">
          <Button
            disabled={!validated}
            type="submit"
            className="rounded-0"
            size="sm"
            variant="outline-primary"
          >
            Login
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default Login;
