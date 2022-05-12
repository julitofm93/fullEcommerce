import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useState } from 'react'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { loginSuccess } from '../redux/userRedux';
import { sessionService } from '../services';


 const Container = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background-color: white;
    justify-content: center;
    border: 1px solid gray;
    ${mobile({ width: "75%"})}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
    color: gray;
    cursor: not-allowed;
  }
`
const Link = styled.a`
    margin: 5px 0px;
    font-style: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
    `;

const Login = () => {
  let navigate = useNavigate();
  let [input, setInput] = useState({
      email: {
          value: '',
          error: null,
      },
      password: {
          value: '',
          error: null,
      }
  })

  const handleInputChange = (e) => {
      setInput((prev) => ({
          ...prev,
          [e.target.name]: {
              value: e.target.value,
              error: null
          }
      }))
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      let error = false
      Object.keys(input).forEach(key => {
          if (input[key].value.length === 0) {
              error = true;
              setInput((prev) => ({
                  ...prev,
                  [key]: {
                      ...prev[key],
                      error: "Completar este campo"
                  }
              }))
          }
      })
      if (!error) {
          sessionService.login({body:{
              email:input.email.value,
              password:input.password.value
          },callbackSuccess:callbackSuccessLogin,callbackError:callbackErrorLogin})
      }
  }
  /*CALLBACKS */
  const callbackSuccessLogin = (response) =>{
    if(process.env.REACT_APP_AUTHENTICATION_MODE==="LOCAL_STORAGE"){
        let user = response.data.user;
        localStorage.setItem('sessionToken',response.data.token)
        localStorage.setItem('user',JSON.stringify(user));
    }else if(process.env.REACT_APP_AUTHENTICATION_MODE==="COOKIE"){
        let user = response.data.user;
        localStorage.setItem('user',JSON.stringify(user));
    }
    window.location.replace('/')
}
  const callbackErrorLogin = (error) =>{
      console.log(error)
  }

    const routeChange = () =>{ 
      let path = "/register"; 
      navigate(path);
    };
    
  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            value={input.email.value} name="email" onChange={handleInputChange} 
          />
            {input.email.error && <Error>{input.email.error}</Error>}
          <Input
            placeholder="password"
            type="password"
            name="password" 
            value={input.password.value} 
            onChange={handleInputChange} 
          />
          {input.password.error && <Error>{input.password.error}</Error>}
          <Button onClick={handleSubmit}>
            LOGIN
          </Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={routeChange}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
      </Container>
    </div>
  );
};

export default Login;