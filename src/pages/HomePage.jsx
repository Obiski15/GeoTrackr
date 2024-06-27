import styled from "styled-components";

import AppLayout from "../ui/AppLayout";

const StyledHomepage = styled.div`
  outline: 2px solid blue;
  width: 100vw;
  min-width: 300px;
  height: 100svh;
  overflow: hidden;
`;

function HomePage() {
  return (
    <StyledHomepage>
      <AppLayout />
    </StyledHomepage>
  );
}

export default HomePage;
