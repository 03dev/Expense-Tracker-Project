import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function ForgetPasswordForm() {
  const [inputState, setInputState] = useState({
    username: "",
    password: "",
    forgetKey: "",
  });

  const { username, password, forgetKey } = inputState;
  const {
    updatePassword,
    setError,
    error,
    forgetPasswordClicked,
    setForgetPasswordClicked,
  } = useGlobalContext();

  function handleSubmit(e) {
    e.preventDefault();
    const response = updatePassword(inputState);
    response
      .then((data) => {
        if (data.data.message === "done");
        setError("Password successfully updated.");
        setTimeout(() => {
          setError("");
          setForgetPasswordClicked(false);
        }, 2000);
      })
      .catch((error) => {});
  }

  function handleClick() {
    setForgetPasswordClicked(false);
  }

  function handleChange(e) {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
    setError("");
  }

  if (forgetPasswordClicked === false) {
    return null;
  }

  return (
    <ForgetStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="password-container">
        <h1>Change you account's password</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="forgetKey"
          placeholder="Password Key"
          required
          value={forgetKey}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          required
          value={password}
          onChange={handleChange}
        />
        <div style={{ display: "flex", marginBottom: "1rem" }}>
          <button type="submit">Change Pass.</button>
          <button type="button" onClick={handleClick}>
            Cancel
          </button>
        </div>
      </div>
    </ForgetStyled>
  );
}

const ForgetStyled = styled.form`
  .password-container {
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
    a {
      margin: 1rem;
      position: relative;
      right: 7rem;
      cursor: pointer;
    }
    button {
      margin: 0 2rem;
      height: 3rem;
      width: 8rem;
      margin-top: 3rem;
      border: none;
      font-size: 1rem;
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

export default ForgetPasswordForm;
