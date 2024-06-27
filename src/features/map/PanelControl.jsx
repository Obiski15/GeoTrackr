import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import styled from "styled-components";
import PropTypes from "prop-types";

import ButtonIcon from "../../ui/ButtonIcon";
import Tooltip from "../../ui/Tooltip";

const StyledPanelControl = styled.div`
  position: absolute;
  z-index: 999;
  top: 50%;
  right: ${(props) => props.position};
  transition: all 0.2s ease-out;

  & button {
    border-radius: 1rem 0 0 1rem;
    padding: 1rem 0;
    font-size: 2rem;
    background-color: var(--text-color-primary);

    &:hover {
      background-color: var(--text-color-secondary);
    }

    & svg {
      color: var(--primary-color);
    }
  }
`;

function PanelControl({ controlPosition, toggleSidePanel }) {
  return (
    <StyledPanelControl position={controlPosition} onClick={toggleSidePanel}>
      <Tooltip>
        <Tooltip.Button name="panel" position="left">
          <ButtonIcon>
            {controlPosition === 0 ? (
              <IoMdArrowDropleft />
            ) : (
              <IoMdArrowDropright />
            )}
          </ButtonIcon>
        </Tooltip.Button>
        <Tooltip.TooltipText name="panel">
          {controlPosition === 0 ? "Open Panel" : "Close Panel"}
        </Tooltip.TooltipText>
      </Tooltip>
    </StyledPanelControl>
  );
}

PanelControl.propTypes = {
  controlPosition: PropTypes.any,
  toggleSidePanel: PropTypes.func.isRequired,
};

export default PanelControl;
