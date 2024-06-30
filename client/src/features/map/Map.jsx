import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLocation } from "../location/useLocation";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import L from "leaflet";

import { formatDate, getCountryFlagEmoji } from "../../utils/helpers";
import { useTimeline } from "../dashboard/useTimeline";

import ChangeCenter from "./ChangeCenter";
import LocateMe from "./LocateMe";

//leaflet style
import "leaflet/dist/leaflet.css";

function Map({ currentPosition }) {
  const {
    data: {
      locality,
      city,
      countryName,
      countryCode: currentLocationCountryCode,
    },
    error: LocationError,
    isLoading,
  } = useLocation(currentPosition);

  const { data: timeline, error: timelineError } = useTimeline();

  var redMarker = L.icon({
    iconUrl: "/red-marker.svg",
    iconSize: [30, 85],
    iconAnchor: [18, 100],
    popupAnchor: [-3, -76],
  });

  useEffect(() => {
    if (timelineError)
      toast.error(
        "Unable to fetch Location history. Reload page to try again "
      );
  }, [timelineError]);

  return (
    <MapContainer
      center={currentPosition}
      zoom={10}
      scrollWheelZoom={false}
      style={{ width: "100vw", minWidth: "300px", height: "100svh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={currentPosition} icon={redMarker}>
        <Popup autoPan={true} autoClose={false} closeOnClick={false}>
          {isLoading
            ? "loading...."
            : LocationError
            ? `${LocationError.message}`
            : `${getCountryFlagEmoji(
                currentLocationCountryCode
              )} ${locality}, ${city}, ${countryName}`}
        </Popup>
      </Marker>

      {timeline?.map((data, i) => (
        <Marker position={data.position} key={i + 1}>
          <Popup autoPan={true} autoClose={false} closeOnClick={false}>
            <p>
              {getCountryFlagEmoji(data.countryCode)} | {data.category} |{" "}
              {formatDate(data.date)}
            </p>

            <p>{data.address}</p>
          </Popup>
        </Marker>
      ))}
      <LocateMe currentPosition={currentPosition} />
      <ChangeCenter position={currentPosition} />
    </MapContainer>
  );
}

Map.propTypes = {
  currentPosition: PropTypes.array.isRequired,
};

export default Map;
