import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";
import { withRouter, NavLink } from "react-router-dom";
import Axios from "axios";

export default class GamePage extends Component {
  state = {
    game: {},
    isLoaded: false,
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
          first_release_date, 
          platforms.name, 
          franchise.name, 
          involved_companies.company.name, involved_companies.publisher, involved_companies.developer,
          game_modes.name, 
          genres.name;
          
          where id = ${gameID};`,
    })
      .then((response) => {

        this.setState({
          game: response.data[0],
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentWillMount() {
    this.getGameInfo(this.props.match.params.gameID);
  }

  render() {
    let { isLoaded, game } = this.state;
    let {
      cover,
      franchise,
      name,
      game_modes,
      genres,
      involved_companies,
      platforms,
      first_release_date,
      summary,
    } = game;
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

    let franchiseElm = null;
    let gameModesElm = null;
    let genresElm = null;
    let publishersElm = null;
    let developersElm = null;
    let platformsElm = null;
    if (franchise) {
      franchiseElm = franchise ? (
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Franchise: </span>{" "}
          {franchise.name}
        </Card.Text>
      ) : null;
    }

    if (typeof(game_modes)!=='undefined') {
      gameModesElm =
        game_modes.length > 0 ? (
          <Card.Text>
            {" "}
            <span style={{ fontWeight: "bold" }}> Game Modes: </span>
            {game_modes.map((mode, i) => {
              return mode["name"] + " ";
            })}
          </Card.Text>
        ) : null;
    }

    if (typeof(genres)!=='undefined') {
      genresElm =
        genres.length > 0 ? (
          <Card.Text>
            {" "}
            <span style={{ fontWeight: "bold" }}>Genres: </span>
            {genres.map((genre, i) => {
              return genre["name"] + " ";
            })}
          </Card.Text>
        ) : null;
    }

    if (typeof(involved_companies)!=='undefined') {
      developersElm =
        involved_companies.length > 0 ? (
          <Card.Text>
            {" "}
            <span style={{ fontWeight: "bold" }}>Developers: </span>
            {involved_companies.map((involved_company, i) => {
              if (involved_company.developer) {
                return involved_company.company["name"] + " ";
              }
            })}
          </Card.Text>
        ) : null;

      publishersElm =
        involved_companies.length > 0 ? (
          <Card.Text>
            {" "}
            <span style={{ fontWeight: "bold" }}>Publishers: </span>
            {involved_companies.map((involved_company, i) => {
              if (involved_company.publisher) {
                return involved_company.company["name"] + " ";
              }
            })}
          </Card.Text>
        ) : null;
    }

    if (typeof(platfroms)!=='undefined') {
      platformsElm =
        platforms.length > 0 ? (
          <Card.Text>
            {" "}
            <span style={{ fontWeight: "bold" }}>Platforms: </span>
            {platforms.map((platform, i) => {
              return platform["name"] + " ";
            })}
          </Card.Text>
        ) : null;
    }

    return (
      <Col md={3} className="m-1">
        {isLoaded ? (
          <Card>
            <Card.Img
              style={{ height: "100%", width: "100%" }}
              variant="top"
              src={imageSrc}
            />
            <Card.Body>
              <Card.Title
                className={"text-center"}
                style={{ fontWeight: "bold", fontSize: "24px" }}
              >
                {name}
              </Card.Title>
              <Card.Text
                className={"text-center"}
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                ({new Date(first_release_date * 1000).getFullYear()})
              </Card.Text>

              {/* Franchise */}
              {franchiseElm}

              {gameModesElm}

              {genresElm}
              {platformsElm}
              {developersElm}
              {publishersElm}
              {/* Description */}
              {summary ? (
                <Card.Text>
                  <span style={{ fontWeight: "bold" }}>Description: </span>{" "}
                  {summary}
                </Card.Text>
              ) : null}
            </Card.Body>
          </Card>
        ) : null}
      </Col>
    );
  }
}
