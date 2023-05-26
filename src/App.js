import React, { useEffect, useState } from 'react'
import Axios from "axios"


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Container, Badge, ListGroup, Form, Button, ListGroupItem} from 'react-bootstrap'

export default function App() {

  const [users, setUser] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/users").then(res => {
      setUser(res.data)
    }
    )
  },[users])

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser",{
      name:name,
      age: age,
      email: email
    }).then (res => {
      console.log(res.data);
    })
  }
    
  return (
    <Container>
      <Form className='form'>
        <Form.Control type='text' placeholder='Name' onChange={e => setName(e.target.value)}/>
        <Form.Control type='number' placeholder='Number' onChange={e => setAge(e.target.value)}/>
        <Form.Control type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
        <Button variant="success" type="submit" onClick={createUser}>
          Submit
        </Button>
      </Form>


      <div className='result'>
        {users.map(({_id,name,age,email}) => {
          return(

            <ListGroup key={_id}>
              <ListGroupItem variant='dark' className='d-flex justify-content-between'>
                <div className='ms-2 me-auto'>
                  <div className='fw-blod'>{name}</div>{email}
                </div>
                <Badge bg="success" pill>{age}</Badge>
              </ListGroupItem>
            </ListGroup>
            
          )
        })}
      </div>
      
    </Container>

  );
}

// {<div className='card' key={_id}>
//             <ul>
//               <li>Name: {name}</li>
//               <li>Name: {age}</li>
//               <li>Name: {email}</li>
//             </ul>
//           </div> }