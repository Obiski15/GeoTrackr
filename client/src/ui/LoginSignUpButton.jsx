import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";

const StyledLoginSignUpButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  & button {
    width: 100%;
    padding: 1rem;
  }
`;

const AdditionalContext = styled.p`
  color: var(--text-color-primary);
  letter-spacing: 0.3rem;
  font-size: 1.2rem;

  & span:first-child {
    margin-right: 0.5rem;
  }

  & span {
    color: var(--accent-color);
    cursor: default;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginSignUpButton({ children, onClick }) {
  const navigate = useNavigate();
  const childString = children.toLowerCase().replace(" ", "");

  return (
    <StyledLoginSignUpButton>
      <Button
        Icon={childString !== "resetpassword" && <HiArrowRightEndOnRectangle />}
        iconPosition="right"
        type="auth"
        onClick={onClick}
      >
        {children}
      </Button>

      <AdditionalContext>
        {childString === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <span
          onClick={() =>
            navigate(`/auth/${childString === "login" ? "signup" : "login"}`)
          }
        >
          {childString === "login" ? "Sign Up" : "Log In"}
        </span>
        {childString === "login" && (
          <span onClick={() => navigate("/auth/resetpassword")}>
            Forgot Password
          </span>
        )}
      </AdditionalContext>
    </StyledLoginSignUpButton>
  );
}

LoginSignUpButton.propTypes = {
  children: PropTypes.node.isRequired,
  additionalContext: PropTypes.object,
  onClick: PropTypes.func,
};

export default LoginSignUpButton;
