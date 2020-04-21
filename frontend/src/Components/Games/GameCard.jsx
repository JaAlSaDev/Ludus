import React from 'react'
import { Col, Card } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";

export default function GameCard(props) {
    let { name, coverSrc, first_release_date} = props;

    return (
        <Col md={3} className="m-2">
        <Card>
          {/* <Image style={{ height: 150, width: 150 }} src={link} /> */}
          <Card.Img
            style={{ height: 400, width: "100%" }}
            variant="top"
            src={coverSrc}
          />
          <Card.Body>
            <Card.Title className={"text-center"}>{name}</Card.Title>
            <Card.Text>({first_release_date})</Card.Text>
            {/* <NavLink
              to={`/allmovie/${_id}`}
              className="btn btn-warning btn-block mb-3"
              variant="outline-warning"
            >
              Go to Game Page
            </NavLink> */}
          </Card.Body>
        </Card>
      </Col>
    )
}
