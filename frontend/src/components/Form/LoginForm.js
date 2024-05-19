import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import ForgetPasswordForm from "./ForgetPasswordFrom";

function LoginForm() {
  const [inputState, setInputState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputState;
  const {
    loginUser,
    setError,
    error,
    setLoggedIn,
    setUserId,
    setForgetPasswordClicked,
    forgetPasswordClicked,
  } = useGlobalContext();

  function handleSubmit(e) {
    e.preventDefault();
    const user = loginUser(username);
    user.then((res) => {
      if (res.data === null) setError("User not found");
      else {
        if (res.data.password === password) {
          setUserId(username);
          setLoggedIn(true);
        } else {
          setError("Password is incorrect");
        }
      }
    });
  }

  function handleChange(e) {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
    setError("");
  }

  function handleClick() {
    setForgetPasswordClicked(true);
  }

  if (forgetPasswordClicked) {
    return <ForgetPasswordForm />;
  } else {
    return (
      <LoginFormStyled onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="login-container">
          <h1>Login to your account</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={handleChange}
          />
          <a onClick={handleClick}>Forget Password</a>
          <button type="submit">LOGIN</button>
        </div>
      </LoginFormStyled>
    );
  }
}

const LoginFormStyled = styled.form`
  .login-container {
    font: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    h1 {
      font-size: 2em;
      font-weight: 800;
    }
    input {
      height: 5rem;
      width: 24rem;
      border: none;
      outline: none;
      padding: 2rem;
      margin-top: 2rem;
      font-size: 1em;
      border-radius: 20px;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
    }
    a {
      margin: 1rem;
      position: relative;
      right: 7rem;
      cursor: pointer;
    }
    button {
      height: 3rem;
      width: 10rem;
      border: none;
      outline: none;
      color: #ffffff;
      font-weight: 500;
      margin-top: 3rem;
      font-size: 1.3rem;
      border-radius: 40px;
      background-color: #a57fc0;
      transition: all 0.3s ease;
      box-shadow: 0px 10px 15px rgba(147, 102, 180, 0.4);
      &:focus {
        scale: 0.9;
      }
    }
  }
`;

export default LoginForm;
