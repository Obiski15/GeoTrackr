import styled from "styled-components";

const Heading = styled.h1`
  text-transform: ${(props) => (props.type === "caps" ? "uppercase" : "none")};
  text-align: ${(props) =>
    props.align === "center"
      ? "center"
      : props.align === "right"
      ? "right"
      : "left"};
  color: var(--text-color-primary);
  letter-spacing: 0.3rem;
  width: 100%;
  font-weight: 600;
`;

export default Heading;
