import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../style/Layout";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/IncomeForm";
import IncomeItems from "../ShowItems/Items";
import { rupee } from "../../utils/icons";

function Income() {
  const { addIncome, getIncomes, deleteIncome, totalIncome, incomes, userId } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Income</h1>
        <h2 className="total-income">
          Total Income :{" "}
          <span>
            {rupee}
            {totalIncome()}
          </span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const {
                _id,
                tittle,
                amount,
                date,
                category,
                description,
                type,
                user,
              } = income;
              if (user === userId) {
                console.log(income);
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
                    deleteItem={deleteIncome}
                  />
                );
              }
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
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
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Income;
