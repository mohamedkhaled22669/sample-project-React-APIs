import React, { useState } from 'react'
import { Container, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from "axios"
import { useCookies } from "react-cookie"


const Auth = () => {
    const [cookies, setCookies] = useCookies("access_token")

    const removeCookies = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("adminID")
        window.location.reload(false)

    }
    return (
        <>

            {
                cookies.access_token ? <Button variant='danger' onClick={removeCookies}>Logout</Button>
                    : (
                        <>
                            <Register />
                            <Login />
                        </>
                    )
            }

        </>
    )
}


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:3001/register", { username, password })
        alert("Admin is Created")
    }


    return (
        <AuthForm
            lable="Register"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    )
}

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [_, setCookies] = useCookies(["access_token"])


    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await Axios.post("http://localhost:3001/login", { username, password })
        setCookies("access_token", response.data.token)
        window.localStorage.setItem("userID", response.data.adminID)
        window.location.reload(false)


    }

    return (
        <AuthForm
            lable="Login"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}

        />
    )
}


const AuthForm = ({ lable, username, setUsername, password, setPassword, onSubmit }) => {
    return (
        <Container >
            <Form onSubmit={onSubmit} className='form'>
                <h2 className='text-white'>{lable}</h2>
                <Form.Control type='text'
                    placeholder='Name'
                    id='username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Form.Control type='text'
                    placeholder='Password'
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant='success' type='submit'>{lable}</Button>
            </Form>
        </Container>
    )
}

export default Auth