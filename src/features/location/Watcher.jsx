import { CiLocationOn } from "react-icons/ci";
import styled from "styled-components";
import PropTypes from "prop-types";

import { formatDate, getLocale } from "../../utils/helpers";
import { useLocation } from "./useLocation";

import ErrorMessage from "../../ui/ErrorMessage";
import MiniSpinner from "../../ui/MiniSpinner";
import Heading from "../../ui/Heading";

const StyledWatcher = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  padding: 1.5rem 0.5rem;
  background-color: var(--tertiary-color);
  color: var(--text-color-secondary);
`;

const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.1rem;
`;

const Location = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  & svg {
    flex-basis: 10%;
    font-size: 3rem;
    animation: icon 2s linear infinite alternate;

    @keyframes icon {
      0% {
        transform: translateY(-20%);
      }
      25% {
        transform: translateY(0);
      }
      75% {
        transform: translateY(-20%);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

const StyledTime = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  padding: 0.5rem;
`;

function Watcher({ position }) {
  const {
    data: { locality, city, countryName },
    isLoading,
    error,
  } = useLocation(position);

  return (
    <StyledWatcher>
      {isLoading ? (
        <MiniSpinner />
      ) : error ? (
        <ErrorMessage>{error?.message}</ErrorMessage>
      ) : (
        <LocationContainer>
          <Location>
            <CiLocationOn />
            <Heading as="h3">{`${locality}, ${city}, ${countryName}`}</Heading>
          </Location>
          <StyledTime>{`${formatDate(
            new Date()
          )}, ${new Date().toLocaleTimeString(getLocale(), {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</StyledTime>
        </LocationContainer>
      )}
    </StyledWatcher>
  );
}

Watcher.propTypes = {
  position: PropTypes.array.isRequired,
};

export default Watcher;
