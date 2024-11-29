import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useWatchPosition } from "../../hooks/useWatchPosition";

import PanelControl from "../../features/map/PanelControl";
import SidePanel from "../../features/map/SidePanel";
import Map from "../../features/map/Map";

function AppLayout() {
  const [panelControlPosition, setPanelControlPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState([0, 0]);
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();

  const { position, error: positionError } = useWatchPosition();

  useEffect(() => {
    if (position) {
      setCurrentPosition(position);
    }
  }, [position]);

  useEffect(() => {
    if (positionError) {
      toast.error(positionError);
      navigate("/error");
    }
  }, [navigate, positionError]);

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
