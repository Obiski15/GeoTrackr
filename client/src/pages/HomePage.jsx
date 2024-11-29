import styled from "styled-components";

import AppLayout from "../ui/layouts/AppLayout";

const StyledHomepage = styled.div`
  position: relative;
  min-height: 100svh;
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
