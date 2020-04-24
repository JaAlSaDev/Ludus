import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";

export default function UserCard(props) {
  let { userName, name, profilePic } = props.user;

  console.log(name)
  console.log(profilePic)
  return (
    <Col md={3} className="m-2">
      <Card>
        {/* <Image style={{ height: 150, width: 150 }} src={link} /> */}
        {/* <Card.Img
          style={{ height: 400, width: "100%" }}
          variant="top"
          src={profilePic}
        /> */}
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
