import React, { useState } from 'react';
import { Button , Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/loginPage.css'

function LoginPage() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [isValidated, setIsValidated] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  async function validateUser() {
    try {
      let users = await axios.get('https://pdf-converter0.herokuapp.com/api/users')
      for(let i=0; i<users.data.length; i++){
        if(users.data[i].companyEmail === userData.email){
          if(users.data[i].password === userData.password){
            return true
          }
        }
        return false
      }
    }
    catch(e) {
      console.error(e);
    } 
  }

  async function handleClick() {
    let result = await validateUser()
    if(result === true) {
      console.log('validated')
      navigate('/dashboard')
    }
    else {
      console.log('try again')
    }
  }

  return (
    <div className='color-overlay d-flex justify-content-center align-items-center'>
      <Form className='rounded p-4 p-sm-3'>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' name='email' value={userData.email} placeholder='Email' onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={userData.password} placeholder='Password' onChange={handleChange}></Form.Control>
        </Form.Group>
        <Button variant='primary' onClick={handleClick}>Login</Button>
        {/* <Xyz /> */}
        <Form.Group className='mt-2'>
          <Form.Text>Don't have an Account?</Form.Text>
          <a href='/signup'>Sign Up</a>
        </Form.Group>
      </Form>
    </div>
  );
}

export default LoginPage;