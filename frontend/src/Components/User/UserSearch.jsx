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
    let obj = {
      searchTerm: searchTerm,
    };
    console.log(obj);
    axios
      .get("http://localhost:5000/user/search", obj)
      .then((res) => {
        this.state.results = res.data.users;

        console.log(this.state.results)
      })
      .catch((err) => {
        console.log(err);
      });

    // axios({
    //   method: 'get',
    //   url: "http://localhost:5000/user/search",
    //   headers: {},
    //   data: {
    //     "searchTerm": searchTerm
    //   }
    // });
  }

  searchHandler = () => {
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

        {this.state.results.map((user) => {
          return <UserCard user={user} />;
        })}
      </div>
    );
  }
}
