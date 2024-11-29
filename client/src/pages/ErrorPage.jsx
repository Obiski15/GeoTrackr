import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../ui/components/Button";

const StyledError = styled.div`
  min-height: 100vh;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const Main = styled.div`
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  letter-spacing: 0.1rem;

  & h1 {
    font-size: 5rem;
  }

  & button {
    padding: 2rem;
  }
`;

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <StyledError>
      <Main>
        <h1>OOps!</h1>
        <p>something went wrong!</p>
        <Button onClick={() => navigate("/")}>go to homepage</Button>
      </Main>
    </StyledError>
  );
}

export default ErrorPage;
