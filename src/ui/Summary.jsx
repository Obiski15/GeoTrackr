import styled from "styled-components";
import PropTypes from "prop-types";

import Heading from "./Heading";

const StyledPlacesVisitedSummary = styled.div`
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

function Summary({ text, value }) {
  return (
    <StyledPlacesVisitedSummary>
      <SummaryContainer>
        <SummaryName>{text}</SummaryName>
        <Heading as="h3">{value}</Heading>
      </SummaryContainer>
    </StyledPlacesVisitedSummary>
  );
}

Summary.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Summary;
