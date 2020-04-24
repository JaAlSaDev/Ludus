import React, { Component } from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import GameCard from "./GameCard";
import axios from "axios";

export default class GameSearch extends Component {
  state = {
    results: [],
  };

  changeHandler = (e) => {
    let temp = { ...this.state };

    temp[e.target.name] = e.target.value;

    this.setState(temp);
  };

  async getGames(searchTerm) {
    axios({
      url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": "e136419f3f5c53e489266f695ae903e6",
      },
      data: `search "${searchTerm}"; fields name, cover.image_id, first_release_date; limit 20; offset 0; where themes != (42);`,
    })
      .then((response) => {
        this.setState({
          results: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  searchHandler = () => {
    this.getGames(this.state["searchTerm"]);
  };
  render() {
    let { results } = this.state;
    return (
      <div>
        <Container>
          <Form.Group>
            <Form.Label>Search Games</Form.Label>
            <Form.Control name="searchTerm" onChange={this.changeHandler} />
            <button onClick={this.searchHandler}>Search</button>
          </Form.Group>
        </Container>

        <Row>
          {results.map((game, i) => {
            return <GameCard key={i} game={game} />;
          })}
        </Row>
      </div>
    );
  }
}
