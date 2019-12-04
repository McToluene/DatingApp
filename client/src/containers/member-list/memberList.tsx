import React, { FC, useContext, useEffect, Fragment } from "react";
import { getUsers } from "../../action/usersAction";
import { store } from "../../store";
import { Spinner, Container, Row } from "react-bootstrap";

import "./member-list.css";
import { User } from "../../model/User";
import MemberCard from "../../components/member/card/member-card";

const MemberList: FC = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  let displayContent;
  if (state.users != null) {
    if (state.users.loading === true) {
      displayContent = (
        <Spinner className="loading" variant="success" animation="grow" />
      );
    }
    if (state.users.users != null) {
      displayContent = (
        <Container className="mt-5">
          <Row>
            {state.users.users.map((user: User) => (
              <MemberCard key={user.id} user={user} />
            ))}
          </Row>
        </Container>
      );
    }
  } else {
    displayContent = <h1 className="loading">No members available</h1>;
  }

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  return <Fragment>{displayContent}</Fragment>;
};

export default MemberList;
