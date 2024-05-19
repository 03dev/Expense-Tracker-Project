import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../style/Layout";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/ExpensesForm";
import IncomeItems from "../ShowItems/Items";
import { rupee } from "../../utils/icons";

function Expenses() {
  const {
    addExpenses,
    getExpenses,
    deleteExpenses,
    totalExpenses,
    expenses,
    userId,
  } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expenses :{" "}
          <span>
            {rupee}
            {totalExpenses()}
          </span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="expenses">
            {expenses.map((expense) => {
              const {
                _id,
                tittle,
                amount,
                date,
                category,
                description,
                type,
                user,
              } = expense;
              if (user === userId) {
                console.log(expense);
                return (
                  <IncomeItems
                    key={_id}
                    id={_id}
                    tittle={tittle}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpenses}
                  />
                );
              }
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
}

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: inset(0px 1px 15px rgba(0, 0, 0, 0.06));
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .expense-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }
`;

export default Expenses;
