import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useState } from 'react'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import ProfileForm from '../components/ProfileForm';
import Orders from '../components/Orders';


 const Container = styled.div`
    flex: 3;
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const navigate = useNavigate(); 
    
    const routeChange = () =>{ 
      let path = "/register"; 
      navigate(path);
    };

    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, { username, password });
    };



  return (
    <>
    <div className="container mt-lg-5 mt-3">
      <div className="row align-items-start">
        <div className="col-lg-4 p-0 shadow ">
          <div className="author-card pb-0 pb-md-3">
            <div className="author-card-cover"></div>
            <div className="author-card-profile row">
              <div className="author-card-avatar col-md-5">
                <img src="./images/user.png" alt="userprofileimage" />
              </div>
              <div className="author-card-details col-md-7">
                <h5 className="author-card-name mb-2">
                  <strong>userInfo.name</strong>
                </h5>
                <span className="author-card-position">
                  <>Joined moment(userInfo.createdAt).format("LL")</>
                </span>
              </div>
            </div>
          </div>
          <div className="wizard pt-3 ">
            <div class="d-flex align-items-start">
              <div
                class="nav align-items-start flex-column col-12 nav-pills me-3 "
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  class="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Profile Settings
                </button>
                <button
                  class="nav-link d-flex justify-content-between"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Orders List
                  <span className="badge2">orders ? orders.length : 0</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* panels */}
        <div
          class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
          id="v-pills-tabContent"
        >
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
              <ProfileForm />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
              <Container>
              <Orders/>
              </Container>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Login;