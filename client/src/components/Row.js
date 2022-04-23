import React from "react";
import styled from "styled-components";

const StyledRow = styled.div`
  display: ${props => props.display || "flex"};
  flex-wrap: ${props => props.flex || "wrap"};
  margin: ${props => props.margin || "0px 0px 10px 0px"};
  border: ${props => props.border};
  padding: ${props => props.padding};
  box-shadow: ${props => props.boxShadow};
  justify-content: ${props => props.justify};

  @media (max-width: 768px) {
    display: block;
  }
`;

const RowFlex = styled(StyledRow)`
  display: flex;
  margin: ${props => props.margin};
`;

export default function Row(props) {
  return (
    <>
      {props.flex ? (
        <RowFlex {...props}>{props.children}</RowFlex>
      ) : (
        <StyledRow {...props}>{props.children}</StyledRow>
      )}
    </>
  );
}
