import React from "react";
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.align || "stretch"};
  justify-content: ${props => props.justify || "end"};
  margin-top: ${props => props.marginTop || "10px"};
  @media (max-width: 992px) {
    display: ${props => props.display};
    text-align: center;
  }
`;
const StyledFlexColumn = styled(StyledFlex)`
  flex-direction: column;
`;
export default function Flex(props) {
  return (
    <>
      {props.col ? (
        <StyledFlexColumn {...props}>{props.children}</StyledFlexColumn>
      ) : (
        <StyledFlex {...props}>{props.children}</StyledFlex>
      )}
    </>
  );
}
