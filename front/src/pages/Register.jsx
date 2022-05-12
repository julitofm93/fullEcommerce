import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import { register } from '../redux/apiCalls'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerSuccess } from '../redux/userRedux';
import Swal from 'sweetalert2';
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
    width: 40%;
    border: 1px solid gray;
    background-color: white;
    ${mobile({ width: "75%"})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.span`
    font-style: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
    `;

const Register = () => {
    let navigate = useNavigate();
    let [input,setInput] = useState({
        first_name:{
            value:"",
            error:"",
        },
        last_name:{
            value:'',
            error:'',
        },
        email:{
            value:'',
            error:'',
        },
        phone:{
            value:'',
            error:'',
        },
        password:{
            value:'',
            error:'',
        }
    })
    const [image,setImage] = useState(null);
    const handleInputChange = (e) =>{
        setInput((prev) => ({
            ...prev,
            [e.target.name]: {
                value: e.target.value,
                error: null
            }
        }))
    }
    const handleImageChange = (e) =>{
        setImage(e.target.files[0])
    }
    const handleSubmit = (e) =>{
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
            let form = new FormData();
            form.append('first_name',input.first_name.value);
            form.append('last_name',input.last_name.value);
            form.append('email',input.email.value);
            form.append('phone',input.phone.value);
            form.append('password',input.password.value);
            sessionService.register({body:form,callbackSuccess:callbackSuccessRegister,callbackError:callbackErrorRegister})
            console.log(form)
        }
    }
    
    /*CALLBACKS */
    const callbackSuccessRegister = (response) =>{
        if(response.data.error){
            Swal.fire({
                icon:"error",
                title:"Cannot Register",
                text:response.data.error,
                timer:2000
            }).then(result=>{
                Object.keys(input).forEach(key=>setInput(prev=>({
                    ...prev,
                    [key]:{
                        error:'',
                        value:''
                    }
                })))
            })
        }else{
            Swal.fire({
                icon:"success",
                title:'Usuario Registrado',
                text:"Ahora puede identificarse",
                timer:2000
            }).then(result=>{
                window.location.replace('/login')
            })
        }
    }
    const callbackErrorRegister = (response) =>{
        console.log(response.data);
    }

        const routeChange = () =>{ 
            let path = "/login"; 
            navigate(path);
          };

  return (
    <div>
    <Announcement/>
    <Navbar/>
    <Container>
        <Wrapper>
            <Title>Create an account</Title>
            <Form>
                <Input 
                name="first_name"
                placeholder='Name'
                value={input.first_name.value} 
                onChange={handleInputChange}
                />
                {input.first_name.error&&<Error>{input.first_name.error}</Error>}
                <Input 
                name="last_name"
                placeholder='Last Name'
                value={input.last_name.value} 
                onChange={handleInputChange}
                />
                {input.first_name.error&&<Error>{input.first_name.error}</Error>}
                <Input 
                name="phone" 
                placeholder='Phone'
                value={input.phone.value} 
                onChange={handleInputChange}
                />
                {input.first_name.error&&<Error>{input.first_name.error}</Error>}
                <Input 
                name="email"
                placeholder='Email'
                value={input.email.value}
                onChange={handleInputChange}
                />
                {input.first_name.error&&<Error>{input.first_name.error}</Error>}
                <Input 
                type="password" 
                name="password"
                placeholder='Password' 
                value={input.password.value} 
                onChange={handleInputChange}
                />
                {input.first_name.error&&<Error>{input.first_name.error}</Error>}
                <Input 
                placeholder="Confirm Password"
                />
                <Agreement>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem consequatur, amet repellendus quo accusantium unde sint nemo magnam explicabo saepe animi facilis quae. Delectus beatae nisi facere repellendus aspernatur.</Agreement>
                <Button onClick={handleSubmit} >CREATE</Button>
                <Button onClick={routeChange}>LOG IN</Button>
            </Form>
            

        </Wrapper>
    </Container>
    </div>
  )
}


export default Register