import React from "react";
import styled from "styled-components";

const StyledParagragh = styled.p`
  text-align: ${props => props.textAlign || "center"};
`;

export default function Paragragh(props) {
  return <StyledParagragh {...props}>{props.children}</StyledParagragh>;
}
