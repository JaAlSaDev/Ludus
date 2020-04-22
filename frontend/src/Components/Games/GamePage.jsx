import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";
import Axios from "axios";

export default class GamePage extends Component {
  state = {
    game: {},
  };

   getGameInfo(gameID) {
    Axios({
      url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": "e136419f3f5c53e489266f695ae903e6",
      },
      data: `
          fields 

          name, summary, 
          cover.image_id,
          release_dates.human, release_dates.platform.name, release_dates.region, 
          platforms.name, 
          franchise.name, 
          involved_companies.company.name, involved_companies.publisher, involved_companies.developer,
          game_modes.name, 
          genres.name;
          
          where id = ${gameID};`,
    })
      .then((response) => {
        console.log(response.data);

        this.setState({
          game: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getGameInfo(this.props.match.params.gameID);
  }

  render() {
      console.log(this.props.match.params.gameID)
    let { name, summary, cover, release_dates, platforms, franchise, involved_companies, game_modes, genres} = this.state.game;
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
        {/* <Card>
          <Card.Img
            style={{ height: "100%", width: "100%" }}
            variant="top"
            src={imageSrc}
          />
          <Card.Body>
            <Card.Title className={"text-center"}>{name}</Card.Title>
            <Card.Text>({first_release_date})</Card.Text>
          </Card.Body>
        </Card> */}
      </Col>
    );
  }
}
