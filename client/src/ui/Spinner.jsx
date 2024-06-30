import styled from "styled-components";

const StyledSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--backdrop-color);
`;

const Spin = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  position: absolute;
  top: 45%;
  left: 45%;
  transform: translate(-50%, -50%);
  border: 10px solid var(--background-color-light);
  border-top: 10px solid var(--tertiary-color);
  border-bottom: 10px solid var(--tertiary-color);
  animation: spin 0.3s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function Spinner() {
  return (
    <StyledSpinner>
      <Spin />
    </StyledSpinner>
  );
}

export default Spinner;
