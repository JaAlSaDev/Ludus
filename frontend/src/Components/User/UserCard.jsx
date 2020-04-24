import React from "react";
import { Col, Card } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";

export default function UserCard(props) {
<<<<<<< HEAD
  let { name, profilePic } = props.user;
=======
  let { userName, name, profilePic } = props.user;
>>>>>>> AB_USER_FUNCs

  console.log(name)
  console.log(profilePic)
  return (
    <Col md={3} className="m-2">
      <Card>
        {/* <Image style={{ height: 150, width: 150 }} src={link} /> */}
        <Card.Img
          style={{ height: 400, width: "100%" }}
          variant="top"
          src={profilePic}
        />
        <Card.Body>
<<<<<<< HEAD
          <Card.Title className={"text-center"}>{name}</Card.Title>
=======
        <Card.Title className={"text-center"}>
            <Link className="a" to={`/users/${userName}`}> 
              {name}
            </Link>
          </Card.Title>
>>>>>>> AB_USER_FUNCs
        </Card.Body>
      </Card>
    </Col>
  );
}
