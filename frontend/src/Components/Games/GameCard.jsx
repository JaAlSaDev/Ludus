import React from "react";
import { Col, Card } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";

export default function GameCard(props) {
  let { id, name, cover, first_release_date } = props.game;
  
  let imageSize = {
    cover_small: "cover_small",
    screenshot_med: "screenshot_med",
    cover_big: "cover_big",
    logo_med: "logo_med",
    screenshot_big: "screenshot_big",
    screenshot_huge: "screenshot_huge",
    thumb: "thumb",
    micro: "micro",
    HD: "720p",
    FHD: "1080p",
  };
  let imageSrc = "";

  //Show an image if the cover exists
  if (cover) {
    let coverID = cover.image_id;
    let size = imageSize.HD;
    imageSrc = `https://images.igdb.com/igdb/image/upload/t_${size}/${coverID}.jpg`;
  }

  return (
    <Col md={3} className="m-1">
      <Card>
        {/* <Image style={{ height: 150, width: 150 }} src={link} /> */}
        <Card.Img
          style={{ height: "100%", width: "100%" }}
          variant="top"
          src={imageSrc}
        />
        <Card.Body>
          <Card.Title className={"text-center"}>
            <Link className="a" to={`/gamePage/${id}`}>
              {name}
            </Link>
          </Card.Title>

          <Card.Text className={"text-center"}>({new Date(first_release_date*1000).getFullYear()})</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
