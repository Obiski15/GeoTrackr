import styled from "styled-components";

const Spin = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: auto;
  border: 2px solid var(--secondary-color);
  border-top: 2px solid var(--text-color-primary);
  animation: spin 0.7s linear 0.5s infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function MiniSpinner() {
  return <Spin />;
}

export default MiniSpinner;
