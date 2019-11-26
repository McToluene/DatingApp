import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { Form, FormControl, FormLabel, Button } from "react-bootstrap";
import Axios from "axios";

interface IRegisterProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface IRegister {
  username: string;
  password: string;
  confirm?: string;
}

const Register: FC<IRegisterProps> = ({ onCancel }) => {
  const [userRegister, setUserRegister] = useState<IRegister>({
    username: "",
    password: "",
    confirm: ""
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "username":
        setUserRegister({
          username: value,
          password: userRegister.password,
          confirm: userRegister.confirm
        });
        break;
      case "password":
        setUserRegister({
          username: userRegister.username,
          password: value,
          confirm: userRegister.confirm
        });
        break;
      case "confirm":
        setUserRegister({
          username: userRegister.username,
          password: userRegister.password,
          confirm: value
        });
        break;
      default:
        break;
    }
  };

  const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const form = event.currentTarget;

    const registerUser = {
      password: userRegister.password,
      username: userRegister.username
    };
    Axios.post("http://localhost:5000/api/auth/register", registerUser)
      .then(res => console.log("Registered succesfully"))
      .catch(err => console.log(err));
  };

  return (
    <Form onSubmit={onSubmitHandle}>
      <h2 className="text-center text-primary">Sign Up</h2>
      <hr />
      <Form.Group>
        <FormLabel>Username</FormLabel>
        <FormControl
          required
          size="sm"
          type="text"
          placeholder="Username"
          className="rounded-0 mr-sm-2"
          name="username"
          value={userRegister.username}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid" className="feedback">
          Please provide a username
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <FormControl
          required
          size="sm"
          type="password"
          placeholder="Password"
          className="rounded-0 mr-sm-2"
          name="password"
          value={userRegister.password}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid" className="feedback">
          Please provide a password
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <FormControl
          required
          size="sm"
          type="password"
          placeholder="Confirm Password"
          className="rounded-0 mr-sm-2"
          name="confirm"
          value={userRegister.confirm}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid" className="feedback">
          Please provide a password
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="text-center">
        <Button
          type="submit"
          className="rounded-0 mr-2"
          variant="outline-success"
        >
          Register
        </Button>
        <Button
          className="rounded-0"
          variant="outline-danger"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Register;
