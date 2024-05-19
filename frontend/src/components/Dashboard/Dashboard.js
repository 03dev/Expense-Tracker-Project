import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../style/Layout";
import Chart from "../Chart/Chart";
import { useGlobalContext } from "../../context/globalContext";
import { rupee } from "../../utils/icons";
import History from "../History/History";

function Dashboard() {
  const {
    getIncomes,
    getExpenses,
    totalIncome,
    totalExpenses,
    totalBalance,
    incomes,
    expenses,
  } = useGlobalContext();

  const minSalary = Math.min(...incomes.map((item) => item.amount));
  const maxSalary = Math.max(...incomes.map((item) => item.amount));
  const minExpense = Math.min(...expenses.map((item) => item.amount));
  const maxExpense = Math.max(...expenses.map((item) => item.amount));
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="status-container">
          <div className="chart-container">
            <Chart />
            <div className="amount-container">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {rupee} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {rupee} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {rupee} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-container">
            <History />
            <h2 className="salary-tittle">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {rupee}
                {minSalary === Infinity ? 0 : minSalary}
              </p>
              <p>
                {rupee}
                {maxSalary === -Infinity ? 0 : maxSalary}
              </p>
            </div>
            <h2 className="salary-tittle">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {rupee}
                {minExpense === Infinity ? 0 : minExpense}
              </p>
              <p>
                {rupee}
                {maxExpense === -Infinity ? 0 : maxExpense}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .status-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-container {
      grid-column: 1 / 4;
      height: 400px;
      .amount-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }
        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }
    .history-container {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-tittle {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
