import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/loginPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    companyName: '',
    companyAdd: '',
    phone: '',
    companyEmail: '',
    companySite: '',
    password: '', 
    confPassword: ''
  })

  function emptyFieldValidation() {
    return (userData.companyName && userData.companyAdd && userData.companyEmail && userData.phone && userData.password && userData.confPassword)
  } 

  function fieldValidation() {
    if(userData.password !== userData.confPassword){
      alert('Passwords dont match')
      document.querySelector('.confPassword').value = ''
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault()
    fieldValidation()

    await axios
      .post("https://pdf-converter0.herokuapp.com/users", {
        companyEmail: userData.companyEmail,
        phone: userData.phone,
        companyName: userData.companyName,
        companyAdd: userData.companyAdd,
        companySite: userData.companySite,
        password: userData.password 
      })

    navigate('/dashboard')
  }

  return (
    <div className='color-overlay d-flex justify-content-center align-items-center'>
      <Form className='rounded p-4 p-sm-5'>
        <Form.Group className='mb-3'>
          <Form.Text><h3 style={{textAlign: 'center', color: 'rgba(0,0,0,0.5)'}}>Create an Account</h3></Form.Text>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Company Name <div style={{display: 'inline', color: 'red'}}>*</div></Form.Label>
          <Form.Control type='text' name='companyName' value={userData.companyName} onChange={e => handleChange(e)}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Company Address <div style={{display: 'inline', color: 'red'}}>*</div></Form.Label>
          <Form.Control type='text' name='companyAdd' value={userData.companyAdd} onChange={e => handleChange(e)} required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Company Email <div style={{display: 'inline', color: 'red'}}>*</div></Form.Label>
          <Form.Control type='email' name='companyEmail' value={userData.companyEmail} onChange={e => handleChange(e)}  required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Phone Number <div style={{display: 'inline', color: 'red'}}>*</div></Form.Label>
          <Form.Control type='text' name='phone' value={userData.phone} onChange={e => handleChange(e)} required></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Company Website</Form.Label>
          <Form.Control type='text' name='companySite' value={userData.companySite} onChange={e => handleChange(e)}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Password <div style={{display: 'inline', color: 'red'}}>*</div></Form.Label>
          <Form.Control type='password' name='password' value={userData.password} onChange={e => handleChange(e)}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Confirm Password <div style={{display: 'inline', color: 'red'}}>*</div></Form.Label>
          <Form.Control type='password' className='confPassword' name='confPassword' value={userData.confPassword} onChange={e => handleChange(e)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Button variant='primary' onClick={e => handleSubmit(e)} disabled={!emptyFieldValidation()}>Create</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUp;