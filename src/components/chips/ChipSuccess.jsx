import React from "react";
import styled from "styled-components";
import Theme from "../../theme/Theme";

const ChipSuccess = (props) => {
  return (
    <Theme dark={props.dark}>
      <Wrapper>{props.label}</Wrapper>
    </Theme>
  );
};

export default ChipSuccess;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 0px ${(props) => props.theme.padding.sm};
  height: 2rem;
  background-color: ${(props) => props.theme.color.success};
  border-radius: ${(props) => props.theme.border.radius.lg};
  border: 1px solid ${(props) => props.theme.border.color.success};
  font-family: ${(props) => props.theme.font.success};
  font-size: 14px;
  color: ${(props) => props.theme.text.success};
  text-align: center;
  user-select: none;
`;
