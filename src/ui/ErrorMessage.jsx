import styled from "styled-components";
import PropTypes from "prop-types";

const StyledErrorMessage = styled.div`
  margin: auto;

  padding: 2rem;
  text-align: center;
  color: var(--error-color);
`;
function ErrorMessage({ children }) {
  return (
    <StyledErrorMessage>😓 :( An Error Occured: {children}</StyledErrorMessage>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
