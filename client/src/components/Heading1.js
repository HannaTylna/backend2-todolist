import React from "react";
import styled from "styled-components";

const StyledHeading1 = styled.h1`
  color: ${props => props.color || "#499edf"};
  margin: ${props => props.margin || "10px auto"};
  text-align: center;
  font-weight: bold;
`;
const Heading1Center = styled(StyledHeading1)`
  text-align: ${props => props.textAlign || "center"};
`;

export default function Heading1(props) {
  return (
    <>
      {props.center ? (
        <Heading1Center {...props}>{props.children}</Heading1Center>
      ) : (
        <StyledHeading1 {...props}>{props.children}</StyledHeading1>
      )}
    </>
  );
}
