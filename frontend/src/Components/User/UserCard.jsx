import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";

export default function UserCard(props) {
  let { userName, name, profilePic } = props.user;

  return (
    <Col md={3} className="m-2">
      <Card>
        <Card.Body>
        <Card.Title className={"text-center"}>
            <Link className="a" to={`/users/${userName}`}> 
              {name}
            </Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}
