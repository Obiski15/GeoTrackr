import styled from "styled-components";
import PropTypes from "prop-types";

const StyledErrorMessage = styled.div`
  margin: auto;

  padding: 2rem;
  text-align: center;
  color: var(--error);
`;
function ErrorMessage({ children }) {
  return (
    <StyledErrorMessage>😓 :( An Error Occured: {children} </StyledErrorMessage>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorMessage;
