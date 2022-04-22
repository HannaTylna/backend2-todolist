import { useState } from "react";
import "./css/FormInput.css";
import styled from "styled-components";
import Column from "./Column";
import Row from "./Row";

const StyledLabel = styled.label`
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  margin-left: 15px;
`;
const StyledInput = styled.input`
  width: 90%;
`;

const FormInput = props => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = e => {
    setFocused(true);
  };

  return (
    <>
      <Row flex>
        <Column col="0">
          <StyledLabel {...props}>{label}</StyledLabel>
        </Column>
        <Column col="12">
          <StyledInput
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span>{errorMessage}</span>
        </Column>
      </Row>
    </>
  );
};

export default FormInput;
