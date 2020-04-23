import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { Nav } from './Components/Nav/Nav'
import { Login } from "./Components/User/Login";
import { Register } from "./Components/User/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from 'jwt-decode'
import GameSearch from "./Components/Games/GameSearch";
import UserSearch from "./Components/User/UserSearch";
import GamePage from "./Components/Games/GamePage";

export default class App extends Component{
  state = {
    user : null , 
    isLogin : false
  }
  
  componentDidMount (){
  
    this.userLogin()
    
  }
  
  
  
  userLogin = () =>{
  
    if (localStorage.token){
      let token = localStorage.token
      let user = jwt_decode(token , "SECRET").user
      this.setState({
        user : user , 
        isLogin:true
      })
      }else {
        this.setState({
          user : null , 
          isLogin:false
        })
      }
  
  }
  render(){

  
  return (
    <div>
      <Nav isLogin ={this.state.isLogin} userLogin = {this.userLogin} />
      <Switch>
        {/* <Route /> */}
        <Route path = '/login' component = {Login} />
        <Route path = '/register' component = {Register} />
        <Route path = '/gameSearch' component = {GameSearch} />
        <Route path = '/gamePage/:gameID' component = {GamePage} />
        <Route path = '/userSearch' component = {UserSearch} />
        </Switch>
    </div>
  );
}
}


