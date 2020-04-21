import React from 'react'
import { Col, Card } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";

export default function UserCard(props) {
    let { name, profilePic} = props;

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
            <Card.Title className={"text-center"}>{name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    )
}
