import styled from "styled-components";
import PropTypes from "prop-types";

export const StyledFormError = styled.span`
  color: red;
  font-size: 1.2rem;
  font-style: italic;
  text-transform: capitalize;
`;

function FormError({ errorMessage }) {
  return <StyledFormError>{errorMessage}</StyledFormError>;
}

FormError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default FormError;
