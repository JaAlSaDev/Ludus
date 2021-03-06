import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import Axios from "axios";

export const Login = (props) => {
  const [login, setLogin] = useState({});

  let onChangeInput = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  useEffect(() => {});

  let onSubmit = (e) => {
    e.preventDefault();

    try {
      let res = Axios.post("http://localhost:5000/user/login", login);
      props.userLogin(res.data.token);
    } catch (error) {}
  };

  return (
    <div>
      <Container>
        <h1>Login Page</h1>
        <h3>Hey do a form here</h3>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" onChange={(e) => onChangeInput(e)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={(e) => onChangeInput(e)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Sign in!
        </Button>
      </Container>
    </div>
  );
};
