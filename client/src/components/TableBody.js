import React from "react";
import styled from "styled-components";

const StyledTr = styled.tr`
  border: 1px solid #000;
`;

const StyledTh = styled.th`
  border: 1px solid #000;
  background: ${props => props.background || "#fff"};
  font-weight: ${props => props.fontWeight || "100"};
  padding: 5px;
  text-align: ${props => props.textAlign || "center"};
`;

export default function TableBody(props) {
  return (
    <>
      {props.tr ? (
        <StyledTr {...props}>{props.children}</StyledTr>
      ) : (
        <StyledTh {...props}>{props.children}</StyledTh>
      )}
    </>
  );
}
