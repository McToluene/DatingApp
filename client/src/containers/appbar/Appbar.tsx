import React, {
  Fragment,
  useEffect,
  useState,
  FormEvent,
  ChangeEvent
} from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Login from "../../components/login/login";
import IUser from "../../model/IUser";

import Axios from "axios";

const Appbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState<IUser>({
    password: "",
    username: ""
  });

  const loggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "username") {
      setUser({ username: value, password: user.password });
    } else if (name === "password") {
      setUser({ username: user.username, password: value });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    const createdUser: IUser = {
      username: user.username,
      password: user.password
    };
    submit(createdUser);
  };

  // submit user login details to api
  const submit = async (user: IUser) => {
    await Axios.post("http://localhost:5000/api/auth/login", user)
      .then(result => {
        localStorage.setItem("token", result.data.token);
        setIsLoggedIn(true);
      })
      .catch(err => console.log(err));
  };

  // control login button on validity
  const onFormChange = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    console.log("Logged out successfully");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (loggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Fragment>
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="#home">DatingApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#matches">Matches</Nav.Link>
            <Nav.Link href="#lists">Lists</Nav.Link>
            <Nav.Link href="#messages">Messages</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown title="Welcome User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <i className="fa fa-user"></i> Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#logout" onClick={onLogout}>
                  <i className="fa fa-sign-out"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Login
                handleSubmit={handleSubmit}
                onChangeHandle={onFormChange}
                validated={validated}
                onInputChange={handleInputChange}
                user={user}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Appbar;
