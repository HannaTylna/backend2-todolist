import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: ${props => props.display || "flex"};
  padding: ${props => props.padding || "5px"};
  margin: ${props => props.margin || "5px auto"};
  text-transform: ${props => props.textTransform || "uppercase"};
  background: #5f6a91;
  color: #fff;
  border: 2px double #fff;
  &:hover {
    background: #fff;
    color: #000;
    font-weight: bold;
  }
`;

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
