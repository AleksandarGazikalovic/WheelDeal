import React from "react";
import styled from "styled-components";
import Theme from "../../theme/Theme";

const PrimaryChip = (props) => {
  return (
    <Theme dark={props.style}>
      <Wrapper>{props.label}</Wrapper>
    </Theme>
  );
};

export default PrimaryChip;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 0px ${(props) => props.theme.padding.sm};
  height: 2rem;
  background-color: ${(props) => props.theme.color.primary};
  border-radius: ${(props) => props.theme.border.radius.lg};
  border: 1px solid ${(props) => props.theme.border.color.primary};
  font-family: ${(props) => props.theme.font.primary};
  font-size: 14px;
  color: ${(props) => props.theme.text.primary};
`;
