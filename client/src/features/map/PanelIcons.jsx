import { IoShareOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import styled from "styled-components";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { useLocation } from "../../services/location/useLocation";
import { useUser } from "../../services/user/useUser";
import { shareFile } from "../../utils/helpers";

import ButtonIcon from "../../ui/components/ButtonIcon";
import AddLocationForm from "./AddLocationForm";
import Modal from "../../ui/components/Modal";

const StyledPanelIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  border: 2px solid var(--tertiary-color);
  border-radius: 1rem;

  & button {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    position: relative;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ButtonDescription = styled.p`
  text-transform: capitalize;
  font-size: 1.3rem;
`;

function PanelIcons({ position }) {
  const [locationString, setLocationString] = useState("");
  const {
    data: { locality, city, countryName, latitude, longitude },
  } = useLocation(position);
  const { isLoading: isLoadingUser } = useUser();

  useEffect(() => {
    if (city)
      setLocationString(
        `My Location\nLatitude:${latitude}, Longitude:${longitude}\n${city}, ${locality}, ${countryName}`
      );
  }, [locality, city, countryName, latitude, longitude]);

  return (
    <StyledPanelIcons>
      <Modal>
        <Wrapper>
          <Modal.Opens name="current-location">
            <ButtonIcon disabled={isLoadingUser}>
              <IoAdd />
            </ButtonIcon>
          </Modal.Opens>

          <ButtonDescription>Add to Timeline</ButtonDescription>

          <Modal.Window name="current-location">
            <AddLocationForm position={position} />
          </Modal.Window>
        </Wrapper>

        <Wrapper>
          <ButtonIcon
            onClick={() => {
              navigator.clipboard.writeText(locationString);
              toast.success("copied to clipboard");
            }}
          >
            <FaRegCopy />
          </ButtonIcon>
          <ButtonDescription>Copy</ButtonDescription>
        </Wrapper>

        <Wrapper>
          <ButtonIcon
            onClick={() =>
              shareFile({
                title: "Current Location",
                text: locationString,
              })
            }
          >
            <IoShareOutline />
          </ButtonIcon>
          <ButtonDescription>Share</ButtonDescription>
        </Wrapper>
      </Modal>
    </StyledPanelIcons>
  );
}

PanelIcons.propTypes = {
  position: PropTypes.array.isRequired,
};

export default PanelIcons;
