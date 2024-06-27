import { useEffect, useState } from "react";

import { useWatchPosition } from "../hooks/useWatchPosition";
import PanelControl from "../features/map/PanelControl";
import SidePanel from "../features/map/SidePanel";
import Map from "../features/map/Map";

import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

function AppLayout() {
  const [panelControlPosition, setPanelControlPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [showPanel, setShowPanel] = useState(false);

  const { error: geolocationError, position } = useWatchPosition();

  useEffect(() => {
    if (position) {
      setCurrentPosition(position);
    }
  }, [position, currentPosition]);

  if (geolocationError) return <ErrorMessage>{geolocationError}</ErrorMessage>;

  if (!position) return <Spinner />;

  function toggleSidePanel() {
    setShowPanel((show) => !show);
  }

  return (
    <>
      <Map currentPosition={currentPosition} />
      <PanelControl
        controlPosition={panelControlPosition}
        toggleSidePanel={toggleSidePanel}
      />
      <SidePanel
        showPanel={showPanel}
        toggleSidePanel={toggleSidePanel}
        setPanelControlPosition={setPanelControlPosition}
        position={currentPosition}
      />
    </>
  );
}

export default AppLayout;
