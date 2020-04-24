import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { Nav } from "./Components/Nav/Nav";
import { Login } from "./Components/User/Login";
import { Register } from "./Components/User/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import GameSearch from "./Components/Games/GameSearch";
import UserSearch from "./Components/User/UserSearch";
import GamePage from "./Components/Games/GamePage";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import { decode } from "jsonwebtoken";
import Axios from "axios";

export default class App extends Component {
  state = {
    user: null,
    isLogin: false,
  };

  componentDidMount() {
    console.log(localStorage.token);

    if (localStorage.token) {
      this.userLogin(localStorage.token);
    }
  }

  loginHandler = (token) => {
    this.userLogin(token);
  };

  userLogin = async (token) => {
    localStorage.setItem("token", token);
    let decodedToken = decode(token);
    // console.log(token)

    console.log(decodedToken);
    if (decodedToken) {
      try {
        let user = await this.getUserInfo(decodedToken.userName);

        this.setState({
          user: user,
          isLogin: true,
        });
      } catch (error) {
        console.log(error);
        this.setState({
          user: null,
          isLogin: false,
        });
      }
    } else {
      localStorage.removeItem("token");
    }
  };

  logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      user: null,
      isLogin: false,
    });
  };

  async getUserInfo(userName) {
    try {
      let res = await Axios.get(
        `http://localhost:5000/user/showProfile/${userName}`
      );
      let user = await res.data.user;
      return user;
    } catch (error) {
      console.log(error.response);
      return null;
    }
  }

  refreshPage = () => {
    this.forceUpdate();
    window.location.reload(false);
  };

  render() {
    let { user, isLogin } = this.state;

    console.log(user);

    return (
      <div>
        <Nav
          authState={this.state}
          isLogin={isLogin}
          userLogin={this.userLogin}
          user={user}
          logout={this.logoutHandler}
        />
        <Switch>
          {/* <Route /> */}
          <Route
            path="/login"
            render={() => (
              <Login
                userLogin={this.loginHandler}
                refreshPage={this.refreshPage}
              />
            )}
          />
          <Route
            path="/register"
            render={() => (
              <Register
                userLogin={this.userLogin}
                refreshPage={this.refreshPage}
              />
            )}
          />
          <Route path="/gameSearch" component={GameSearch} />
          <Route path="/gamePage/:gameID" component={GamePage} />
          <Route path="/userSearch" component={UserSearch} />
          <Route
            path="/users/:userName"
            render={(props) => (
              <Profile
                authState={this.state}
                getUserInfo={this.getUserInfo}
                {...props}
              />
            )}
          />
          <Route
            path="/EditProfile/:userName"
            render={(props) =>
              isLogin && props.match.params.userName === user.userName ? (
                <EditProfile getUserInfo={this.getUserInfo} {...props} />
              ) : (
                <Login />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
