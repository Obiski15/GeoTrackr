import styled from "styled-components";
import PropTypes from "prop-types";

import AddLocationForm from "./AddLocationForm";
import ErrorMessage from "../../ui/ErrorMessage";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";

const StyledSearchLocationResult = styled.div`
  width: 100%;
  border: 1px solid var(--background-color-light);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
  gap: 1rem;
`;

function SearchLocationResult({ data, error }) {
  const { features, query } = data;
  return (
    <StyledSearchLocationResult>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <Heading as="h6">
            {`${features.length} ${features.length > 1 ? "Results" : "Result"}`}{" "}
            found for {`"${query?.text}"`}
          </Heading>
          <Table columns="1fr .05fr">
            <Modal>
              <Table.Body
                data={features?.map((feature) => feature?.properties)}
                render={(property, i) => (
                  <Table.Row key={i + 1}>
                    <div>{property?.formatted}</div>
                    <Modal.Opens name={i + 1}>
                      <Button style={{ backgroundColor: "red" }}>Add</Button>
                    </Modal.Opens>

                    <Modal.Window name={i + 1}>
                      <AddLocationForm property={property} />
                    </Modal.Window>
                  </Table.Row>
                )}
              ></Table.Body>
            </Modal>
          </Table>
        </>
      )}
    </StyledSearchLocationResult>
  );
}

SearchLocationResult.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default SearchLocationResult;
