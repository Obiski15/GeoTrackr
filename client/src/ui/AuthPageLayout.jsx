import styled from "styled-components";

const AuthPageLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  border-radius: 2rem;
  min-height: 100svh;
  min-width: 250px;
  max-width: 800px;
  overflow-y: auto;
  margin: 2rem auto;
  scrollbar-width: none;
`;

export default AuthPageLayout;
