import React, { useState, useEffect } from 'react'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import Axios from 'axios'


export const Register = () => {

   const [user, setUser] = useState({})

   useEffect(() => {
      console.log(user)

   })

   let onChangeInput = ({target: {name, value}}) => {
      setUser({...user, [name]:value})
   }

   let onSubmit = (e) => {
      e.preventDefault()

      Axios.post('http://localhost:5000/user/register', user)
      .then( res => localStorage.setItem('token', res.data.token))
      .catch( err => console.log(err.response))
   }


   return (
      <div>
         <Container>
            <h1>Register page</h1>
            <Form.Group>
               <Form.Label>First Name</Form.Label>
               <Form.Control name="firstName" onChange = { (e) => onChangeInput(e)} />
            </Form.Group>
            <Form.Group>
               <Form.Label>Username</Form.Label>
               <Form.Control name="userName" onChange = { (e) => onChangeInput(e)}/>
            </Form.Group>
            <Form.Group>
               <Form.Label>Email</Form.Label>
               <Form.Control name="email" onChange = { (e) => onChangeInput(e)}/>
            </Form.Group>
            <Form.Group>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  name="password"
                  type="password"
                  onChange = { (e) => onChangeInput(e)}
               />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick = {(e) => onSubmit(e)}>
               Register
</Button>
         </Container>
      </div>
   )
}
