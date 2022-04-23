import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #000;
  background: ${props => props.background};
`;

export default function Table(props) {
  return <StyledTable {...props}>{props.children}</StyledTable>;
}
