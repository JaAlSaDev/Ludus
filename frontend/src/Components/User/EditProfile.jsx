import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import React, { Component } from "react";
export default class EditProfile extends Component {
  state = {
    user: {},
    isLoaded: false,
    edit: {
      password: "",
    },
  };
  onChangeInput = (e) => {
    let temp = { ...this.state };
    temp.edit[e.target.name] = e.target.value;
    this.setState(temp);
    console.log(this.state.edit);
  };
  
  getUserInfo = async (userName) => {
    console.log("profile props", this.props);

    try {
      let user = await this.props.getUserInfo(userName);

      console.log("user get info", user);

      if (user) {
        this.setState({
          user: user,
          isLoaded: true,
        });
      } else {
        this.setState({
          user: {
          },
          isLoaded: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.edit);
    axios
      .put("http://localhost:5000/user/updateUser", this.state.edit, {
        headers: {
          "x-auth-token": localStorage.token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  componentWillMount() {
    this.getUserInfo(this.props.match.params.userName);
  }
  render() {
    let { user, isLoaded } = this.state;
    let {
      _id,
      name,
      userName,
      email,
      profilePic,
      FriendsList,
      nationality,
      aboutMe,
      languages,
    } = user;
    return (
      <div>
        {isLoaded ? (
          <Container>
            <h1>Edit</h1>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                defaultValue={name}
                name="name"
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                defaultValue={userName}
                name="userName"
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                defaultValue={email}
                name="email"
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                defaultValue={""}
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nationality:</Form.Label>
              <Form.Control
                defaultValue={nationality}
                name="nationality"
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>About me:</Form.Label>
              <Form.Control
                defaultValue={aboutMe}
                name="aboutMe"
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Languages:</Form.Label>
              <Form.Control
                defaultValue={languages}
                name="languages"
                onChange={(e) => this.onChangeInput(e)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => this.onSubmit(e)}
            >
              Save
            </Button>
          </Container>
        ) : null}
      </div>
    );
  }
}
