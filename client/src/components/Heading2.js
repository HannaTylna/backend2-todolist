import React from "react";
import styled from "styled-components";

const StyledHeading2 = styled.h2`
  color: ${props => props.color || "#000"};
  margin: ${props => props.margin || "10px auto"};
  text-align: ${props => props.textAlign || "center"};
  border-radius: ${props => props.borderRadius || "20px"};
  box-shadow: ${props => props.boxShadow || "none"};
  text-transform: ${props => props.textTransform || "uppercase"};
  font-weight: ${props => props.fontWeight || "bold"};
`;

export default function Heading2(props) {
  return <StyledHeading2 {...props}>{props.children}</StyledHeading2>;
}
