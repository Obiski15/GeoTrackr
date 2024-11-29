import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { IoMdLocate } from "react-icons/io";
import styled from "styled-components";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import L from "leaflet";

import { useLocation } from "../../services/location/useLocation";
import { useTimeline } from "../../services/timeline/useTimeline";
import { formatDate } from "../../utils/helpers";

import ButtonIcon from "../../ui/components/ButtonIcon";

//leaflet style
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const StyledLocateMe = styled.div`
  position: absolute;
  z-index: 999;
  top: 10rem;
  left: 1rem;
`;

function getCountryFlagEmoji(countryCode) {
  if (!countryCode) return;

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Map({ currentPosition }) {
  const { data: timeline, error: timelineError } = useTimeline();
  const {
    data: {
      locality,
      city,
      countryName,
      countryCode: currentLocationCountryCode,
    },
    error: LocationError,
    isLoading: isLoadingCurrentLocation,
  } = useLocation(currentPosition);
  const navigate = useNavigate();

  var redMarker = L.icon({
    iconUrl: "/red-marker.svg",
    iconSize: [30, 85],
    iconAnchor: [18, 100],
    popupAnchor: [-3, -76],
  });

  useEffect(() => {
    if (timelineError) {
      if (timelineError.code.toString().startsWith("5")) {
        toast.error(timelineError.message);
        navigate("/error");
      }
    }
  }, [timelineError, navigate]);

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      scrollWheelZoom={false}
      style={{ width: "100vw", minWidth: "380px", minHeight: "100svh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={currentPosition} icon={redMarker}>
        <Popup autoPan={true} autoClose={false} closeOnClick={false}>
          {isLoadingCurrentLocation
            ? "loading...."
            : LocationError
            ? `${LocationError.message}`
            : `${getCountryFlagEmoji(
                currentLocationCountryCode
              )} ${locality}, ${city}, ${countryName}`}
        </Popup>
      </Marker>

      {timeline?.data?.timeline?.map((data, i) => (
        <Marker position={data?.position} key={i + 1}>
          <Popup autoPan={true} autoClose={false} closeOnClick={false}>
            <p>
              {getCountryFlagEmoji(data?.countryCode)} | {data?.category} |{" "}
              {formatDate(data?.createdAt)}
            </p>

            <p>{data?.address}</p>
          </Popup>
        </Marker>
      ))}
      <LocateMe position={currentPosition} />
      <ChangeCenter position={currentPosition} />
    </MapContainer>
  );
}

function LocateMe({ position }) {
  const map = useMap();

  function handleClick() {
    map.flyTo(position);
  }

  return (
    <StyledLocateMe>
      <ButtonIcon onClick={handleClick} type="secondary">
        <IoMdLocate />
      </ButtonIcon>
    </StyledLocateMe>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

LocateMe.propTypes = {
  position: PropTypes.array,
};

Map.propTypes = {
  currentPosition: PropTypes.array.isRequired,
};

export default Map;
