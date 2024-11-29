import styled from "styled-components";

import { useTimeline } from "../../services/timeline/useTimeline";

import DashboardLayout from "../../ui/layouts/DashboardLayout";
import Heading from "../../ui/components/Heading";

const StyledStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

const Wrapper = styled.div`
  min-height: 16.8rem;
  min-width: 16.5rem;
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--secondary-color) url("/dummy-map.jpeg") no-repeat left top;
  background-size: cover;
  border: 3px solid var(--background-color-light);
`;

const SummaryContainer = styled.div`
  margin-left: 0.5rem;
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  padding: 0;
`;

const SummaryName = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: var(--text-color-primary);
  font-size: 0.8rem;
  font-weight: 200;
  padding: 0;
  margin: 0;
`;

function Stats() {
  const { data } = useTimeline();
  const categories = [
    ...new Set(data?.data?.timeline.map((data) => data.category)),
  ];

  return (
    <DashboardLayout title="map stats">
      <StyledStats>
        <Wrapper>
          <SummaryContainer>
            <SummaryName>places visited</SummaryName>
            <Heading as="h3">{data?.data?.timeline.length}</Heading>
          </SummaryContainer>
        </Wrapper>

        <Wrapper>
          <SummaryContainer>
            <SummaryName>categories</SummaryName>
            <Heading as="h3">{categories?.length}</Heading>
          </SummaryContainer>
        </Wrapper>
      </StyledStats>
    </DashboardLayout>
  );
}

export default Stats;
