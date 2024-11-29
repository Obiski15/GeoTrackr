import styled from "styled-components";
import PropTypes from "prop-types";

import Heading from "../components/Heading";

const StyledDashboardLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
`;

function DashboardLayout({ children, title }) {
  return (
    <StyledDashboardLayout>
      <Heading as="h5" type="caps">
        {title}
      </Heading>
      {children}
    </StyledDashboardLayout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardLayout;
