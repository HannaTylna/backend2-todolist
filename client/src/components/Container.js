import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  font-family: "Catamaran", sans-serif;
  padding: 10px 50px;
  margin: 0px auto;

  @media (max-width: 576px) {
    max-width: 540px;
  }
  @media (max-width: 768px) {
    max-width: 720px;
  }
  @media (max-width: 992px) {
    max-width: 960px;
  }
  @media (max-width: 1200px) {
    max-width: 1175px;
  }
`;

export default function Container(props) {
  return <StyledContainer {...props}>{props.children}</StyledContainer>;
}
