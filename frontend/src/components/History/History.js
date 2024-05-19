import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { rupee } from "../../utils/icons";

function History() {
  const { transcationsHistory } = useGlobalContext();
  const history = transcationsHistory();
  const sliceHistory = history.slice(0, 3);

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {sliceHistory.map((item) => {
        const { _id, tittle, amount, type } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {tittle}
            </p>
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense" ? `-${amount}` : `+${amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
