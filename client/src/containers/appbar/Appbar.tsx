import React, {
  Fragment,
  useState,
  FormEvent,
  ChangeEvent,
  useContext,
  useEffect
} from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Login from "../../components/login/login";
import IUser from "../../model/IUser";
import { store } from "../../store";
import {
  loginUser,
  logoutUser,
  setCurrentUser
} from "../../action/authActions";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

const Appbar: React.FC = () => {
  const globalState = useContext(store);
  const history = useHistory();
  const { state, dispatch } = globalState;
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState<IUser>({
    password: "",
    username: ""
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "username") {
      setUser({ username: value, password: user.password });
    } else if (name === "password") {
      setUser({ username: user.username, password: value });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    loginUser(createdUser, dispatch, history);
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
    logoutUser(dispatch, history);
  };

  let authDisplay;
  if (state != null && state.auth != null && state.auth.isAuth === true) {
    authDisplay = (
      <NavDropdown title="Welcome User" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">
          <i className="fa fa-user"></i> Edit Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>
          <i className="fa fa-sign-out-alt"></i>Logout
        </NavDropdown.Item>
      </NavDropdown>
    );
  } else {
    authDisplay = (
      <Login
        handleSubmit={handleSubmit}
        onChangeHandle={onFormChange}
        validated={validated}
        onInputChange={handleInputChange}
        user={user}
      />
    );
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const decoded = jwt_decode(localStorage.token);
      dispatch(setCurrentUser(decoded));
      history.push("/matches");
    }
    console.log("in Navbar");
  }, [history, dispatch]);

  return (
    <Fragment>
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            DatingApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/matches">
                Matches
              </Nav.Link>
              <Nav.Link as={Link} to="/lists">
                Lists
              </Nav.Link>
              <Nav.Link as={Link} to="/messages">
                Messages
              </Nav.Link>
            </Nav>
            <Nav>{authDisplay}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Appbar;
