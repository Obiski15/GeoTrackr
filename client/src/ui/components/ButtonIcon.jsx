import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: 0.5rem;

  ${(props) => {
    switch (props.type) {
      case "danger":
        return css`
          background-color: var(--error);
          border: 1px solid var(--light-error-color);
        `;
      case "secondary":
        return css`
          background-color: transparent;
          border: none;
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
            border: 1px solid var(--error);
          `;
        case "secondary":
          return css`
            background-color: transparent;
            border: none;
          `;
        default:
          return css`
            background-color: var(--background-color-light);
          `;
      }
    }}
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--text-color-primary);
  }
`;

export default ButtonIcon;
