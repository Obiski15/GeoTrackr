import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../../ui/components/Button";

const StyledClosePanel = styled.div`
  @media only screen and (min-width: 500px) {
    display: none;
  }
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: fit-content;
  position: absolute;
  right: 0;
`;

function ClosePanel({ toggleSidePanel }) {
  return (
    <StyledClosePanel>
      <ButtonWrapper>
        <Button onClick={toggleSidePanel}>Close Panel</Button>
      </ButtonWrapper>
    </StyledClosePanel>
  );
}

ClosePanel.propTypes = {
  toggleSidePanel: PropTypes.func.isRequired,
};

export default ClosePanel;
