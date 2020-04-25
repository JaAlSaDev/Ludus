import React, { Component } from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import GameCard from "./GameCard";
import Axios from "axios";

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
    try {
      let games = await Axios.get(`http://localhost:5000/game/search/${searchTerm}`);

      this.setState({
        results: games.data,
      });
    } catch (error) {

    }
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
