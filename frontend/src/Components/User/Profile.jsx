import React, { Component } from "react";

import { Col, Card, Button } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = {
    user: {},
    isLoaded: false,
  };

  getUserInfo = (userID) => {
    axios
      .put("http://localhost:5000/user/showProfile", { userID: userID })
      .then((res) => {
        this.setState({
          user: res.data.user,
          isLoaded: true,
        });

        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendFriendRequest = (senderId, recieverId) => {
    axios
      .put("http://localhost:5000/user/addFriend", { senderId, recieverId })
      .then((res) => {
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  acceptFriendRequest = (recieverID, senderID) => {
    axios
      .put("http://localhost:5000/user/acceptFriend", { recieverID, senderID })
      .then((res) => {
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeFriend = (_id, friendID) =>{
    axios
      .put("http://localhost:5000/user/removeFriend", {_id, friendID })
      .then((res) => {
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  componentWillMount() {
    this.getUserInfo(this.props.match.params.userID);
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
    
    if (typeof FriendsList !== "undefined") {
      friendsElm = FriendsList.map((friend, i) => {

        console.log(friend)
        return (
          <>
            <Card.Text key={i}>{friend.friendID.name}</Card.Text>

            {this.props.authState.isLogin &&
            _id === this.props.authState.user._id ? (
              <>
                {friend.isAccepted ? (
                  <Button onClick={this.removeFriend(this.props.authState.user._id, friend.friendID._id)} variant="outline-dark"> Remove Friend</Button>
                ) : (
                  <>
                    {" "}
                    {friend.role == "sender" ? (
                      <>
                        <Button onClick={this.acceptFriendRequest(this.props.authState.user._id, friend.friendID._id)} variant="outline-dark"> Accept Request </Button>

                        <Button onClick={this.removeFriend(this.props.authState.user._id, friend.friendID._id)} variant="outline-dark"> Reject Request</Button>
                      </>
                    ) : (
                      <Button onClick={this.removeFriend(this.props.authState.user._id, friend.friendID._id)} variant="outline-dark"> Cancel Request</Button>
                    )}{" "}
                  </>
                )}
              </>
            ) : null}
          </>
        );
      });
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
                  onClick={this.sendFriendRequest(
                    this.props.authState.user._id,
                    _id
                  )}
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
                    pathname: `/EditProfile/${_id}`,
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
