import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import { useSearchLocation } from "../../services/location/useSearchLocation";

import AddLocationForm from "../map/AddLocationForm";
import ErrorMessage from "../../ui/components/ErrorMessage";
import MiniSpinner from "../../ui/components/MiniSpinner";
import Heading from "../../ui/components/Heading";
import Button from "../../ui/components/Button";
import Table from "../../ui/components/Table";
import Modal from "../../ui/components/Modal";

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

const SearchResult = styled.div`
  width: 100%;
  border: 1px solid var(--background-color-light);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
  gap: 1rem;
`;

function SearchLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useSearchLocation(searchQuery);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchParams.get("q"));
  }

  return (
    <StyledSearchLocation>
      <Form onSubmit={handleSubmit}>
        <Input
          name="location-search"
          placeholder="Search for a location..."
          disabled={isLoading}
          value={searchParams.get("q")}
          onChange={(e) => {
            searchParams.set("q", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        <Button disabled={isLoading || !searchParams.get("q")}>
          {isLoading ? <MiniSpinner /> : "Search"}
        </Button>
      </Form>

      {Object.keys(data).length > 0 && (
        <SearchResult>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <>
              <Heading as="h6">
                {data?.features?.length} Result(s) found for{" "}
                {`"${data?.query?.text}"`}
              </Heading>
              <Table columns="1fr .05fr">
                <Modal>
                  <Table.Body
                    data={data?.features?.map((feature) => feature?.properties)}
                    render={(property, i) => (
                      <Table.Row key={i + 1}>
                        <div>{property?.formatted}</div>
                        <Modal.Opens name={i + 1}>
                          <Button style={{ backgroundColor: "red" }}>
                            Add
                          </Button>
                        </Modal.Opens>
                        <Modal.Window name={i + 1}>
                          <AddLocationForm
                            position={[property?.lat, property?.lon]}
                          />
                        </Modal.Window>
                      </Table.Row>
                    )}
                  ></Table.Body>
                </Modal>
              </Table>
            </>
          )}
        </SearchResult>
      )}
    </StyledSearchLocation>
  );
}

SearchLocation.propTypes = {
  position: PropTypes.array,
};

export default SearchLocation;
