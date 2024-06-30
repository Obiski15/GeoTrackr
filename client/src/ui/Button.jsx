import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  text-align: center;
  padding: 0.5rem;
  gap: 0.3em;
  color: var(--text-color-primary);
  outline-offset: -2px;
  border-radius: 0.5rem;
  font-weight: 600;

  ${(props) => {
    switch (props.type) {
      case "danger":
        return css`
          background-color: var(--error-color);
          border: 1px solid var(--light-error-color);
        `;
      case "secondary":
        return css`
          background-color: transparent;
          border: none;
        `;

      case "auth":
        return css`
          padding: 0.5rem 1rem;
          border-radius: 0.7rem;
          background-color: var(--highlight-color);
          border: 1px solid var(--highlight-color);
        `;
      default:
        return css`
          background-color: var(--tertiary-color);
          border: 1px solid var(--tertiary-color);
        `;
    }
  }}

  &:hover {
    ${(props) => {
      switch (props.type) {
        case "danger":
          return css`
            color: var(--light-error-color);
            background-color: var(--text-color-primary);
            border: 1px solid var(--error-color);
          `;
        case "secondary":
          return css`
            background-color: transparent;
            border: none;
          `;
        case "auth":
          return css`
            background-color: var(--text-color-secondary);
            color: var(--highlight-color-bright);
          `;
        default:
          return css`
            background-color: var(--background-color-light);
          `;
      }
    }}
  }
`;

function Button({
  children,
  onClick,
  Icon,
  iconPosition,
  disabled,
  className,
  type,
}) {
  return (
    <StyledButton
      onClick={() => onClick?.()}
      disabled={disabled}
      className={className ? className : ""}
      type={type}
    >
      {iconPosition === "left" && Icon} <span>{children}</span>{" "}
      {iconPosition === "right" && Icon}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  iconPosition: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
  Icon: PropTypes.any,
};

export default Button;
