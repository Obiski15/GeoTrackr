import { HiInformationCircle, HiTrash } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from "styled-components";
import PropTypes from "prop-types";

import { formatDateAndTime } from "../../utils/helpers";
import { useDeleteTimeline } from "./useDeleteTimeline";
import { useTimeline } from "./useTimeline";

import ErrorMessage from "../../ui/ErrorMessage";
import MiniSpinner from "../../ui/MiniSpinner";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const StyledLocationHistory = styled.div`
  width: 100%;
`;

function LocationHistory({ summary }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  const { isPending, mutate: deleteTimeline } = useDeleteTimeline();
  const { error, isLoading, data } = useTimeline();

  const filteredData = data?.filter((data) => {
    if (!query) return data;
    return data.address.includes(query);
  });

  return (
    <StyledLocationHistory>
      {isLoading ? (
        <MiniSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : !filteredData.length > 0 ? (
        <Heading as="h5">
          Looks like you haven&apos;t added any locations to your history yet.
        </Heading>
      ) : (
        <Menus>
          <Table columns="0.5fr 1.5fr 0.6fr 0.2fr">
            <Table.Header>
              <div>Category</div>
              <div>Location</div>
              <div>Date</div>
              <div></div>
            </Table.Header>
            <Table.Body
              data={summary ? filteredData?.slice(0, 8) : filteredData}
              render={(data, i) => (
                <Table.Row key={i + 1}>
                  <div>{data.category}</div>
                  <div> {data.address}</div>
                  <div>{formatDateAndTime(data.date)}</div>
                  <Menus.Toggle id={data.id} />

                  {/* menu list opens on toggle, not part of the Table row */}
                  <Menus.List id={data.id}>
                    <li>
                      <Menus.Button
                        disabled={isPending}
                        onClick={() => {
                          deleteTimeline(data.id);
                        }}
                        Icon={<HiTrash />}
                        iconPosition="left"
                      >
                        Delete
                      </Menus.Button>
                    </li>
                    <li>
                      <Menus.Button
                        Icon={<HiInformationCircle />}
                        iconPosition="left"
                      >
                        Details
                      </Menus.Button>
                    </li>
                  </Menus.List>
                </Table.Row>
              )}
            />

            {summary && (
              <Table.Footer>
                <Button
                  Icon={<RiArrowRightSLine />}
                  iconPosition="right"
                  onClick={() => navigate("/timeline")}
                >
                  View All
                </Button>
              </Table.Footer>
            )}
          </Table>
        </Menus>
      )}
    </StyledLocationHistory>
  );
}

LocationHistory.propTypes = {
  summary: PropTypes.bool,
};

export default LocationHistory;
