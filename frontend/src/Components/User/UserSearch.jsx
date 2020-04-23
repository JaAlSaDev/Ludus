import React, { Component } from "react";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import UserCard from "./UserCard";

export default class UserSearch extends Component {
  state = {
    results: [],
  };

  changeHandler = (e) => {
    let temp = { ...this.state };

    temp[e.target.name] = e.target.value;

    this.setState(temp);

    console.log(temp[e.target.name]);
  };

  async getUsers(searchTerm) {

    console.log("search Term: "+searchTerm)
    axios
      .put("http://localhost:5000/user/search", { searchTerm: searchTerm })
      .then((res) => {
        this.setState({
          results: res.data.users,
        });

        console.log(this.state.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchHandler = () => {
    console.log("search Term: "+this.state.searchTerm)
    this.getUsers(this.state.searchTerm);
  };
  render() {
    return (
      <div>
        <Container>
          <Form.Group>
            <Form.Label>Search Users</Form.Label>
            <Form.Control name="searchTerm" onChange={this.changeHandler} />
            <button onClick={this.searchHandler}>Search</button>
          </Form.Group>
        </Container>

        <Row>
          {this.state.results.map((user, i) => {
            return <UserCard key={i} user={user} />;
          })}
        </Row>
      </div>
    );
  }
}
