import React from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";

function Navigation({ active, setActive }) {
  const { setLoggedIn, setUserId, userId, setIncomes, setExpenses } =
    useGlobalContext();
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>{userId}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.tittle}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li>
          <button onClick={handleClick}>{signout} Sign Out</button>
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  gap: 2rem;
  position: relative;
  height: 100%;
  max-width: 374px;
  width: 40%;
  display: flex;
  border-radius: 32px;
  padding: 2rem 1.5rem;
  flex-direction: column;
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  justify-content: space-between;
  background: rgba(252, 246, 249, 0.78);

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0rem 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }
  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      padding-left: 1rem;
      color: rgba(34, 34, 96, 0.6);
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }
  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
  button {
    font-size: 1.5rem;
    border: none;
    color: rgba(34, 34, 96, 0.6);
    cursor: pointer;
    background: transparent;
    transition: all 0.3s ease;
    &:focus {
      scale: 0.9;
    }
  }
`;
export default Navigation;
