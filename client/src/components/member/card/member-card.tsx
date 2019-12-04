import React from "react";
import { Card, Col, Button } from "react-bootstrap";

import { User } from "../../../model/User";
import "./member-card.css";
import { Link } from "react-router-dom";

interface IMemberCardProps {
  user: User;
}

const MemberCard: React.FC<IMemberCardProps> = ({ user }) => {
  return (
    <Col lg="3" md="3" sm="6">
      <Card className="mb-4 card-member">
        <div className="card-img-wrapper">
          <Card.Img variant="top" src={user.photoUrl} />
          <ul className="list-inline member-icons animate text-center">
            <li className="list-inline-item">
              <Button
                size="sm"
                className="rounded-0"
                as={Link}
                to={`/matches/${user.id}`}
                variant="light"
              >
                <i className="fa fa-user" />
              </Button>
            </li>
            <li className="list-inline-item">
              <Button size="sm" className="rounded-0" variant="info">
                <i className="fa fa-heart" />
              </Button>
            </li>
            <li className="list-inline-item">
              <Button size="sm" className="rounded-0" variant="success">
                <i className="fa fa-envelope" />
              </Button>
            </li>
          </ul>
        </div>
        <Card.Body className="p-1">
          <Card.Title className="text-center mb-1">
            <i className="fa fa-user mr-2" />
            {user.knownAs}, {user.age}
          </Card.Title>
          <Card.Text className="text-muted text-center">{user.city}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MemberCard;
