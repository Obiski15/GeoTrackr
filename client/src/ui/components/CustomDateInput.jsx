import styled from "styled-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const StyledDateInput = styled.input`
  /* unable to overide default style had to make use of !important or inline style */
  border: 2px solid var(--background-color-light) !important;
  border-radius: 0.5rem !important;
  width: 100% !important;
  flex: 1 !important;
  padding: 1.1rem 1rem 1rem 2.5rem !important;
`;

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <StyledDateInput
    onClick={onClick}
    onChange={onChange}
    ref={ref}
    value={value}
  />
));

CustomDateInput.displayName = "CustomDateInput";

CustomDateInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};

export default CustomDateInput;
