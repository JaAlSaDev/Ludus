import React, { Component } from "react";

import { Col, Card, Button } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = {
    user: {
      FriendsList: [],
    },
    authState: this.props.authState,

    isLoaded: false,
  };

  getUserInfo = async (userName) => {

    try {
      let user = await this.props.getUserInfo(userName);

      if (user) {
        this.setState({
          user: user,
          isLoaded: true,
        });
      } else {
        this.setState({
          user: {
            FriendsList: [],
          },
          isLoaded: false,
        });
      }
    } catch (error) {
    }
  };

  sendFriendRequest = (recieverId) => {
    axios
      .put(
        "http://localhost:5000/user/addFriend",
        { recieverId },
        {
          headers: {
            "x-auth-token": localStorage.token,
          },
        }
      )
      .then((res) => {
      })
      .catch((err) => {
      });
  };

  acceptFriendRequest = (senderID) => {
    axios
      .put(
        "http://localhost:5000/user/acceptFriend",
        { senderID },
        {
          headers: {
            "x-auth-token": localStorage.token,
          },
        }
      )
      .then((res) => {
      })
      .catch((err) => {
      });
  };

  removeFriend = (friendID) => {
    axios
      .put(
        "http://localhost:5000/user/removeFriend",
        { friendID },
        {
          headers: {
            "x-auth-token": localStorage.token,
          },
        }
      )
      .then((res) => {
      })
      .catch((err) => {
      });
  };

  componentDidMount() {
    this.getUserInfo(this.props.match.params.userName);
  }

  
  static getDerivedStateFromProps(props, state) {
    if (props.authState != state.authState) {
      return {
        authState: props.authState,
      };
    }

   

    return null;
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

    let friendsElm = null;
    if (isLoaded) {
      if (FriendsList.length > 0) {
        friendsElm = FriendsList.map((friend, i) => {
          
          return (
            <>
              <Card.Text key={i}>{friend.friendID.name}</Card.Text>

              {this.props.authState.isLogin &&
              _id === this.props.authState.user._id ? (
                <>
                  {friend.isAccepted ? (
                    <Button
                      onClick={() => this.removeFriend(friend.friendID._id)}
                      variant="outline-dark"
                    >
                      {" "}
                      Remove Friend
                    </Button>
                  ) : (
                    <>
                      {" "}
                      {friend.role == "sender" ? (
                        <>
                          <Button
                            onClick={() =>
                              this.acceptFriendRequest(friend.friendID._id)
                            }
                            variant="outline-dark"
                          >
                            {" "}
                            Accept Request{" "}
                          </Button>

                          <Button
                            onClick={() =>
                              this.removeFriend(friend.friendID._id)
                            }
                            variant="outline-dark"
                          >
                            {" "}
                            Reject Request
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => this.removeFriend(friend.friendID._id)}
                          variant="outline-dark"
                        >
                          {" "}
                          Cancel Request
                        </Button>
                      )}{" "}
                    </>
                  )}
                </>
              ) : null}
            </>
          );
        });
      }
    }

    return (
      <Col md={3} className="m-1">
        {isLoaded ? (
          <Card>
            {/* <Image style={{ height: 150, width: 150 }} src={link} /> */}
            <Card.Img
              style={{ height: "100%", width: "100%" }}
              variant="top"
              src={profilePic}
            />

            <Card.Body>
              {this.props.authState.isLogin &&
              _id !== this.props.authState.user._id ? (
                <Button
                  variant="outline-dark"
                  onClick={() => this.sendFriendRequest(_id)}
                >
                  {" "}
                  Add Friend{" "}
                </Button>
              ) : null}{" "}
              {this.props.authState.isLogin &&
              _id === this.props.authState.user._id ? (
                <Button
                  as={Link}
                  to={{
                    pathname: `/EditProfile/${userName}`,
                    user: this.state.user,
                  }}
                  variant="outline-dark"
                >
                  {" "}
                  Edit{" "}
                </Button>
              ) : null}{" "}
              <Card.Title className={"text-center"}>Name: {name}</Card.Title>
              <Card.Text>Username: {userName}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Nationality: {nationality}</Card.Text>
              <Card.Text>Languages: {languages}</Card.Text>
              <Card.Text>About me: {aboutMe}</Card.Text>
              Friends List:
              {friendsElm}
            </Card.Body>
          </Card>
        ) : null}
      </Col>
    );
  }
}
