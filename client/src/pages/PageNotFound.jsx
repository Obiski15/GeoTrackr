import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PageLayout from "../ui/layouts/PageLayout";
import Heading from "../ui/components/Heading";
import Button from "../ui/components/Button";

const StyledPageNotFound = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  & button {
    padding: 1rem;
    width: 100%;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <StyledPageNotFound>
        <img src="/warn.png" alt="404 error" />
        <ContentWrapper>
          <Heading>OOPS!!! 404 😢</Heading>
          <Heading as="h4">The Requested Page Could Not Found</Heading>
          <Button
            iconPosition="right"
            Icon={<HiOutlineArrowUpRight />}
            onClick={() => navigate("/")}
          >
            Homepage
          </Button>
        </ContentWrapper>
      </StyledPageNotFound>
    </PageLayout>
  );
}

export default PageNotFound;
