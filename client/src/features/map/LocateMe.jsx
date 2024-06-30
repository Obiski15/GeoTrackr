import { IoMdLocate } from "react-icons/io";
import { useMap } from "react-leaflet";
import styled from "styled-components";
import PropTypes from "prop-types";

import ButtonIcon from "../../ui/ButtonIcon";

const StyledLocateMe = styled.div`
  position: absolute;
  z-index: 999;
  top: 10rem;
  left: 1rem;
`;

function LocateMe({ currentPosition }) {
  const map = useMap();

  function handleClick() {
    map.flyTo(currentPosition);
  }

  return (
    <StyledLocateMe>
      <ButtonIcon onClick={handleClick} type="secondary">
        <IoMdLocate />
      </ButtonIcon>
    </StyledLocateMe>
  );
}

LocateMe.propTypes = {
  currentPosition: PropTypes.array,
};

export default LocateMe;
