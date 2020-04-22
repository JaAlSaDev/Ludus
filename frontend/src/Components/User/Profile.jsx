import React, { Component } from 'react'

import { Col, Card, Button } from "react-bootstrap";
import { withRouter, NavLink, Link } from "react-router-dom";

export default class Profile extends Component {

    state = {
        user: {},
        isLoaded: false
    }

    async getUserInfo(userID){
    //     axios
    //         .put("http://localhost:5000/user/showProfile", { userID: userID })
    //         .then((res) => {
    //             this.setState({
    //                 user: res.data.user,
    //                 isLoaded: true
    //             });

    //             console.log(this.state.user);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    try {
        let user = await this.props.getUserInfo(userID)
        console.log(user)
        this.setState({
            user: user,
            isLoaded: true
          });
          console.log(this.state.user);
    }
    catch {
        
    }
    
    }
    componentWillMount() {
        this.getUserInfo(this.props.match.params.userID)
    }


    render() {
        let {
            user,
            isLoaded
        } = this.state

        let { _id,
            name,
            userName,
            email,
            profilePic,
            FriendsList,
            nationality,
            aboutMe,
            languages
        } = user;

        return (


            <Col md={3} className="m-1">
                {isLoaded ?
                    <Card>
                        {/* <Image style={{ height: 150, width: 150 }} src={link} /> */}
                        <Card.Img
                            style={{ height: "100%", width: "100%" }}
                            variant="top"
                            src={profilePic}
                        />
                        <Card.Body>
                            <Card.Title className={"text-center"}>
                                Name: {name}

                            </Card.Title>

                            <Card.Text>
                                Username: {userName}
                            </Card.Text>
                            <Card.Text>
                                Email: {email}
                            </Card.Text>
                            <Card.Text>
                                Nationality: {nationality}
                            </Card.Text>
                            <Card.Text>
                                Languages: {languages}
                            </Card.Text>
                            <Card.Text>
                                About me: {aboutMe}
                            </Card.Text>
                            {(this.props.authState.isLogin && _id === this.props.authState.user._id) ?
                        <Button as={Link} to={{pathname:`/EditProfile/${_id}`,
                        user: this.state.user }} variant="outline-dark">
                                {" "}
                                Edit{" "}
                            </Button>: null}{" "}
                        </Card.Body>
                    </Card> : null}
            </Col>

        )
    }
}
