import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: none;
  font-weight: ${props => props.fontWeight || "bold"};
  font-size: 16px;
  color: ${props => props.color || "#000"};
  text-transform: uppercase;
  &:hover {
    border-bottom: ${props => props.border || "1px solid #000"};
    color: ${props => props.colorHover || "#000"};
  }
`;

export default function Link(props) {
  return <StyledLink {...props}>{props.children}</StyledLink>;
}
