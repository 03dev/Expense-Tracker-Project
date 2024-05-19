import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "../Form/LoginForm";
import NewUserForm from "../Form/NewUserForm";
import { useGlobalContext } from "../../context/globalContext";

function Login() {
  const [toggle, setToggle] = useState(true);
  const { forgetPasswordPage } = useGlobalContext();

  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <LoginStyled>
      <div className="main-container">
        {toggle === true ? <LoginForm /> : <NewUserForm />}
        <button onClick={handleClick} className="toggle-btn">
          Sign-In/Sign-Up
        </button>
      </div>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  .main-container {
    width: 500px;
    height: 65vh;
    position: absolute;
    top: 50%;
    left: 50%;
    background: rgba(0, 0, 0, 0.06);
    border: 2px solid #ffffff;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .toggle-btn {
      margin-top: 1rem;
      background: transparent;
      border: none;
      font-size: 1rem;
      color: blue;
      outline: none;
      cursor: pointer;
    }
  }
`;

export default Login;
