import React from "react";
import styled from "styled-components";

function Button({
  name,
  icon,
  onClick,
  bg,
  buttonPadding,
  color,
  buttonRadius,
}) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: buttonPadding,
        borderRadius: buttonRadius,
        color: color,
      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  font-size: 1rem;
  font-weight: 700;
  &:focus {
    scale: 0.9;
  }
`;

export default Button;