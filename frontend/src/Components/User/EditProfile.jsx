import React, { useEffect, useState } from 'react'
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap'
import axios from 'axios'


export const EditProfile = (props) => {
    const [edit, setedit] = useState({})

    let onChangeInput = ({target : {name, value}}) => {
        setedit({...edit, [name]: value})
    }

    useEffect(() => {
        console.log(edit)
    })

    let onSubmit = (e) => {
        e.preventDefault() 
        axios
            .put("http://localhost:5000/user/updateUser", edit )
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    let { user } = props.location
    return (
        <div>
            <Container>
                <h1>Edit</h1>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control defaultValue={user.name} name="name" onChange={(e) => onChangeInput(e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        name="userName"
                        onChange={(e) => onChangeInput(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        name="email"
                        onChange={(e) => onChangeInput(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        onChange={(e) => onChangeInput(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nationality:</Form.Label>
                    <Form.Control
                        name="nationality"
                        onChange={(e) => onChangeInput(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>About me:</Form.Label>
                    <Form.Control
                        name="aboutMe"
                        onChange={(e) => onChangeInput(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Languages:</Form.Label>
                    <Form.Control
                        name="langauges"
                        onChange={(e) => onChangeInput(e)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)} >
                    Save
                </Button>
            </Container>
        </div>


    )
}
