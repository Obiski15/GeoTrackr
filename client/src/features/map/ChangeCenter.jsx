import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

export default ChangeCenter;
