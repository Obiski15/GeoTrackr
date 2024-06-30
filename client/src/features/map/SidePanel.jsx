import { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import SearchLocation from "../location/SearchLocation";
import Watcher from "../location/Watcher";

import VisitDashboard from "../../ui/VisitDashboard";
import PanelIcons from "../../ui/PanelIcons";
import ClosePanel from "../../ui/ClosePanel";
import UserMenu from "../../ui/UserMenu";
import Theme from "../../ui/Theme";

const StyledSidePanel = styled.div`
  width: 100%;
  min-height: 100vh;
  font-size: initial;
  cursor: default;
  background-color: var(--secondary-color);
  color: var(--text-color-secondary);
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.showPanel ? 0 : "-100%")};
  padding: 2rem 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  transition: all 0.2s ease-out;

  @media only screen and (min-width: 500px) {
    width: 408px;
    right: ${(props) => (props.showPanel ? 0 : "-408px")};
  }
`;

function SidePanel({
  showPanel,
  toggleSidePanel,
  setPanelControlPosition,
  position,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (showPanel)
      return setPanelControlPosition(`${ref.current.offsetWidth}px`);
    setPanelControlPosition(0);
  }, [setPanelControlPosition, showPanel]);

  return (
    <StyledSidePanel ref={ref} showPanel={showPanel}>
      <UserMenu />
      <VisitDashboard />
      <Theme />
      <Watcher position={position} />
      <PanelIcons position={position} />
      <SearchLocation />
      <ClosePanel toggleSidePanel={toggleSidePanel} />
    </StyledSidePanel>
  );
}

SidePanel.propTypes = {
  setPanelControlPosition: PropTypes.func.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
  showPanel: PropTypes.bool.isRequired,
  position: PropTypes.array.isRequired,
};

export default SidePanel;
