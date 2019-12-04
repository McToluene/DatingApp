import React, { useContext, useEffect, Fragment } from "react";
import { store } from "../../../store";
import { getUser } from "../../../action/usersAction";
import { useRouteMatch } from "react-router";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  ButtonGroup,
  Tabs,
  Tab
} from "react-bootstrap";
import ImageGallery from "react-image-gallery";

import "./member-detail.css";

const MemberDetail: React.FC = () => {
  const globalState = useContext(store);
  const match: any = useRouteMatch();
  const id: number = match.params.id;

  const { state, dispatch } = globalState;

  const getPhotos = (photos: any) => {
    const imageUrl = [];
    for (let i = 0; i < photos.length; i += 1) {
      imageUrl.push({
        original: photos[i].url,
        thumbnail: photos[i].url,
        description: photos[i].description
      });
    }

    return imageUrl;
  };

  let displayContent;
  if (state.users != null) {
    const { user } = state.users;
    const { photos } = user;
    console.log(photos);
    const images = getPhotos(photos);
    displayContent = (
      <Container className="mt-2">
        <Row>
          <h1> {user.knownAs}'s Profile </h1>
        </Row>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Img
                variant="top"
                className="img-thumbnail"
                src={user.photoUrl}
                alt={user.knownAs}
              />
              <Card.Body>
                <div>
                  <strong>Location:</strong>
                  <p>
                    {user.city}, {user.country}
                  </p>
                </div>
                <div>
                  <strong>Age:</strong>
                  <p>{user.age}</p>
                </div>
                <div>
                  <strong>Last Active:</strong>
                  <p>{user.lastActive}</p>
                </div>
                <div>
                  <strong>Member since:</strong>
                  <p>{user.created}</p>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <ButtonGroup className="d-flex">
                  <Button variant="outline-primary" className="rounded-0 w-100">
                    Like
                  </Button>
                  <Button variant="outline-success" className="rounded-0 w-100">
                    Message
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={8}>
            <div className="tab-panel">
              <Tabs
                className="member-tabset"
                defaultActiveKey="profile"
                id="uncontrolled"
              >
                <Tab eventKey="about" title={`About ${user.knownAs}`}>
                  <h4>Description</h4>
                  <p>{user.introduction}</p>
                  <h4>Looking for</h4>
                  <p>{user.lookingFor}</p>
                </Tab>
                <Tab eventKey="interests" title="Interests">
                  <h4>Interests</h4>
                  <p>{user.interests}</p>
                </Tab>
                <Tab eventKey="photos" title="Photos">
                  <ImageGallery items={images} />
                </Tab>
                <Tab eventKey="messages" title="Messages">
                  <p>Messages will go here</p>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    displayContent = <h1>No user details</h1>;
  }

  useEffect(() => {
    getUser(id, dispatch);
  }, [id, dispatch]);

  return <Fragment>{displayContent}</Fragment>;
};

export default MemberDetail;
