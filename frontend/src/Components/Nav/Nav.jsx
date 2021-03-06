import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Header,
  Drawer,
  Content,
  Navigation,
  Layout,
  Textfield,
} from "react-mdl";
import "./Nav.css";

export const Nav = (props) => {
  // https://images.unsplash.com/photo-1499551660540-eaf0697882f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80

  let profileElm = null;

  if (props.authState.isLogin && props.authState.user) {
    profileElm = (
      <Link to={`/users/${props.authState.user.userName}`}>
        {props.user.name}
      </Link>
    );
  }
  return (
    <div style={{ height: "350px", position: "relative" }}>
      <Layout
        style={{
          background:
            "url(https://images.unsplash.com/photo-1499551660540-eaf0697882f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80) center / cover",
        }}
      >
        <Header transparent title="LUDUS">
          <Navigation>
            <Link className="a" to="/gameSearch">
              Search for Games!
            </Link>
            <Link className="a" to="/userSearch">
              Search for Friends!
            </Link>

            {profileElm}
          </Navigation>
        </Header>
        <Drawer title="Join Us!">
          <Navigation>
            {!props.authState.isLogin ? (
              <>
                {" "}
                <Button as={Link} to="/login" variant="outline-dark">
                  Login{" "}
                </Button>
                <Button as={Link} to="/Register" variant="outline-dark">
                  {" "}
                  Register{" "}
                </Button>{" "}
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="outline-dark"
                onClick={props.logout}
              >
                {" "}
                Logout{" "}
              </Button>
            )}
          </Navigation>
        </Drawer>
        <Content />
      </Layout>

      {/* <Navbar bg="dark" variant="dark" className="my-nav">
                    <Nav className="mr-auto">
                        <Navbar.Brand>Ludus</Navbar.Brand>
                        <Nav.Link as={Link} to="/home">Games</Nav.Link>
                        <Nav.Link as={Link} to="/Allmovie">Make Friends!</Nav.Link>
                        <Nav.Link as={Link} to="/About">About</Nav.Link>
                    </Nav>
                    <Nav>
                    <Button as={Link} to="/login" variant="outline-light"> Login </Button>
                    <Button as={Link} to="/Register" variant="outline-light"> Register </Button>
                    </Nav>
                </Navbar> */}
    </div>
  );
};
