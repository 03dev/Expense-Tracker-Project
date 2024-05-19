import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { reload } from "../../utils/icons";

function LoginForm() {
  const [inputState, setInputState] = useState({
    username: "",
    password: "",
    forgetKey: "",
  });
  const [userAdded, setUserAdded] = useState(false);

  const keyMaker = () => {
    const letters =
      "abcdefghijklnmopqrstuvwxyz1234567890ABCDEFGHIJKLNMOPQRSTUVWXYZ!@#$%&*";
    let key = "";
    for (let i = 0; i < 10; i++) {
      const char = letters.charAt(Math.floor(Math.random() * 52) + 1);
      key += char;
    }
    setInputState({
      forgetKey: key,
    });
  };

  useEffect(() => {
    keyMaker();
  }, []);

  const { username, password, forgetKey } = inputState;
  const { error, setError, RegisterUser, setLoggedIn, setUserId } =
    useGlobalContext();

  function handleSubmit(e) {
    e.preventDefault();
    const response = RegisterUser(inputState);
    response
      .then((data) => {
        if (data.data.message === "Done") {
          setError("User Added");
          setTimeout(() => {
            setError("");
            setLoggedIn(true);
            setUserId(username);
          }, 2000);
        }
      })
      .catch((error) => {});
  }

  function handleChange(e) {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
    setError("");
  }

  return (
    <LoginFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="message"></div>
      <div className="login-container">
        <h1>Sign-up to your account</h1>
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
        <div className="password-key">
          <label htmlFor="btn">{forgetKey}</label>
          <button id="btn" type="button" onClick={keyMaker}>
            {reload}
          </button>
        </div>
        <label className="note">
          Note: Save this key in case you forget password
        </label>
        <button className="login-btn" type="submit">
          Sign In
        </button>
      </div>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.form`
  .login-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    h1 {
      font-size: 2rem;
      font-weight: 800;
    }
    input {
      height: 4rem;
      width: 24rem;
      margin-top: 2rem;
      padding: 2rem;
      outline: none;
      font-size: 1.2rem;
      border: none;
      border-radius: 20px;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
    }
    .password-key {
      height: 2rem;
      width: 15rem;
      margin-top: 1rem;
      background-color: #ffffff;
      outline: none;
      font-size: 1.2rem;
      border: none;
      border-radius: 10px;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-bottom: 1rem;
      label {
        font-size: 1.2rem;
      }
      #btn {
        height: 1rem;
        width: 1rem;
        font-size: 1rem;
        background: transparent;
        position: relative;
        border: none;
        cursor: pointer;
      }
    }
    .note {
      font-size: 0.8rem;
    }
    .login-btn {
      height: 3rem;
      width: 10rem;
      margin-top: 5rem;
      border: none;
      font-size: 1.3rem;
      font-weight: 500;
      background-color: #a57fc0;
      color: #ffffff;
      border-radius: 40px;
      box-shadow: 0px 10px 15px rgba(147, 102, 180, 0.4);
      outline: none;
      transition: all 0.3s ease;
      &:focus {
        scale: 0.9;
      }
    }
  }
`;

export default LoginForm;
