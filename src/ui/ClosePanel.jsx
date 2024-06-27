import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";

const StyledClosePanel = styled.div`
  position: relative;
  top: 0.5rem;
  ${(props) => css`
    right: calc(-100% + ${props.width}px);
  `};
  @media only screen and (min-width: 500px) {
    display: none;
  }
`;

function ClosePanel({ toggleSidePanel }) {
  const [buttonWidth, setButtonWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setButtonWidth(ref.current.offsetWidth);
  }, []);

  return (
    <StyledClosePanel ref={ref} width={buttonWidth}>
      <Button onClick={toggleSidePanel}>Close Panel</Button>
    </StyledClosePanel>
  );
}

ClosePanel.propTypes = {
  toggleSidePanel: PropTypes.func.isRequired,
};

export default ClosePanel;
