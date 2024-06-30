import styled from "styled-components";
import { useEffect, useState } from "react";

import SearchLocationResult from "./SearchLocationResult";
import { useSearchLocation } from "./useSearchLocation";

import MiniSpinner from "../../ui/MiniSpinner";
import Button from "../../ui/Button";
import { useSearchParams } from "react-router-dom";

const StyledSearchLocation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.5rem 0;

  & button {
    height: 100%;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 4rem;
  text-transform: capitalize;
  font-size: 1.5rem;
  background-color: var(--tertiary-color);
  border: 1px solid var(--text-color-secondary);
  color: var(--text-color-secondary);
  border-radius: 1rem;
  padding: 1rem;

  &::placeholder {
    color: var(--text-color-secondary);
    font-size: 1.3rem;
  }

  &:focus {
    border: none;
    outline: 1px solid var(--text-color-primary);
    outline-offset: -3px;
  }
`;

function SearchLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data, error, isLoading } = useSearchLocation(searchQuery, enabled);

  useEffect(() => {
    if (searchQuery) return setEnabled(true);
    setEnabled(false);
  }, [searchQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchParams.get("search_location"));
  }

  return (
    <StyledSearchLocation>
      <Form onSubmit={handleSubmit}>
        <Input
          name="location-search"
          placeholder="Search for a location..."
          disabled={isLoading}
          value={searchParams.get("search_location")}
          onChange={(e) => {
            searchParams.set("search_location", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        <Button disabled={isLoading || !searchParams.get("search_location")}>
          {isLoading ? <MiniSpinner /> : "Search"}
        </Button>
      </Form>

      {Object.keys(data).length > 0 && (
        <SearchLocationResult data={data} error={error?.message} />
      )}
    </StyledSearchLocation>
  );
}

export default SearchLocation;
