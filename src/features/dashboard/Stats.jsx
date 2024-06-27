import styled from "styled-components";

import { useTimeline } from "./useTimeline";

import Summary from "../../ui/Summary";

const StyledStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
`;

function Stats() {
  const { data } = useTimeline();
  const categories = [...new Set(data?.map((data) => data.category))];

  return (
    <StyledStats>
      <Summary text={"Places Visited"} value={data?.length} />
      <Summary text={"categories"} value={categories.length} />
    </StyledStats>
  );
}

export default Stats;
