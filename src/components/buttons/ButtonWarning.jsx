import React from "react";
import styled from "styled-components";
import Theme from "../../theme/Theme";

const ButtonWarning = ({ children, ...props }) => {
  return (
    <Theme dark={props.dark ? props.dark : true}>
      <Button
        type="submit"
        disabled={props.disabled}
        onClick={props.onClick}
        title={props.title}
        {...props}
      >
        {children}
      </Button>
    </Theme>
  );
};

export default ButtonWarning;

const Button = styled.button`
  ${(props) => props.sm && props.theme.size.sm}
  ${(props) => props.md && props.theme.size.md}
  ${(props) => props.lg && props.theme.size.lg}
  color: #fff;
  background: ${(props) =>
    props.disabled
      ? props.theme.color.disabled.warning
      : props.theme.color.warning};
  font-family: var(--font-family);
  font-weight: 600;
  letter-spacing: 0.1rem;
  border: none;
  outline: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.color.secondary};
  }

  &:disabled {
    background: ${(props) => props.theme.color.disabled.warning};
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: ${(props) => props.theme.color.disabled.warning};
    color: #fff;
    cursor: not-allowed;
  }
`;
