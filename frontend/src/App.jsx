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

export default class App extends Component {
  state = {
    user: null,
    isLogin: false,
  };

  componentWillMount() {
    console.log(localStorage.token);
    this.userLogin();
  }

  userLogin = () => {
    try {
      let token = localStorage.token;
      let user = jwt_decode(token, "SECRET").user;
      this.setState({
        user: user,
        isLogin: true,
      });
    } catch (err) {
      this.setState({
        user: null,
        isLogin: false,
      });
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

  refreshPage = () => {
    this.forceUpdate()
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
            render={() => <Login userLogin={this.userLogin} refreshPage={this.refreshPage} />}
          />
          <Route path="/register" render={() => <Register userLogin={this.userLogin}  refreshPage={this.refreshPage}/>} />
          <Route path="/gameSearch" component={GameSearch} />
          <Route path="/gamePage/:gameID" component={GamePage} />
          <Route path="/userSearch" component={UserSearch} />
          <Route
            path="/users/:userID"
            render={(props) => <Profile authState={this.state} {...props} />}
          />
          <Route
            path="/EditProfile/:userID"
            render={(props) =>
              isLogin && props.match.params.userID === user._id ? (
                <EditProfile {...props} />
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
