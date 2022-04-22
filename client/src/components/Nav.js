import React from "react";
import styled from "styled-components";
import Flex from "./Flex";
import Column from "./Column";
import NavLinks from "./NavLinks";

const StyledNavBar = styled.div`
  height: 50px;
  background: #5f6a91;
  margin: 0px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

export default function Nav() {
  return (
    <StyledNavBar>
      <Flex align="center">
        <Column col="3" width="0%"></Column>
        <NavLinks />
      </Flex>
    </StyledNavBar>
  );
}
