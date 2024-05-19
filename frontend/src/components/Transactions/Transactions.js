import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  bank,
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  rupee,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";
import { useGlobalContext } from "../../context/globalContext";

function TransactionItems() {
  const { transcationsHistory } = useGlobalContext();
  const history = transcationsHistory();

  const categoryIcon = (category) => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return bank;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCategoryIcon = (category) => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  return (
    <Items>
      {history.map((item) => {
        const { tittle, amount, date, category, description, type } = item;
        return (
          <div className="main-div">
            <div className="icon">
              {type === "expense"
                ? expenseCategoryIcon(category)
                : categoryIcon(category)}
            </div>
            <div className="content">
              <h5>{tittle}</h5>
              <div className="inner-content">
                <div className="text">
                  <p>
                    {rupee} {amount}
                  </p>
                  <p>
                    {calender} {dateFormat(date)}
                  </p>
                  <p>
                    {comment} {description}
                  </p>
                </div>
                <div className="credit-debit">
                  {type === "expense" ? (
                    <h3 id="debit">Debit</h3>
                  ) : (
                    <h3 id="credit">Credit</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Items>
  );
}

const Items = styled.div`
  display: flex;
  flex-direction: column;
  .main-div {
    display: flex;
    padding: 1rem;
    border-radius: 20px;
    background: #ffffff;
    margin: 1rem;
    color: indigo;
  }
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    margin-right: 1rem;
    i {
      font-size: 2.6rem;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }
    .inner-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text {
        display: flex;
        align-items: center;
        gap: 3rem;
        color: var(--primary-color);
        opacity: 0.8;
      }
      #debit {
        color: red;
        margin-right: 2rem;
      }
      #credit {
        color: green;
        margin-right: 2rem;
      }
    }
  }
`;

export default TransactionItems;
