import styled from "styled-components";
import PropTypes from "prop-types";

import { useNavigate, useSearchParams } from "react-router-dom";
import { HiInformationCircle, HiTrash } from "react-icons/hi2";
import { RiArrowRightSLine } from "react-icons/ri";

import { useDeleteTimeline } from "../../services/timeline/useDeleteTimeline";
import { useTimeline } from "../../services/timeline/useTimeline";
import { formatDateAndTime } from "../../utils/helpers";

import ErrorMessage from "../../ui/components/ErrorMessage";
import MiniSpinner from "../../ui/components/MiniSpinner";
import Heading from "../../ui/components/Heading";
import Button from "../../ui/components/Button";
import Table from "../../ui/components/Table";
import Menus from "../../ui/components/Menus";

const StyledLocationHistory = styled.div`
  width: 100%;
`;

function LocationHistory({ summary }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isPending, mutate: deleteTimeline } = useDeleteTimeline();
  const { data = {}, isLoading, error } = useTimeline();

  const query = searchParams.get("search");

  const filteredData = data?.data?.timeline?.filter((data) => {
    if (!query) return data;
    return data.address.includes(query);
  });

  return (
    <StyledLocationHistory>
      {isLoading ? (
        <MiniSpinner />
      ) : !filteredData?.length > 0 ? (
        <Heading as="h5" align="center">
          Looks like you haven&apos;t added any location to your history yet.
        </Heading>
      ) : error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : (
        <Menus>
          <Table columns="minmax(80px, 0.5fr) 1.5fr minmax(80px, 0.6fr) 0.2fr">
            <Table.Header>
              <div>Category</div>
              <div>Location</div>
              <div>Date</div>
            </Table.Header>
            <Table.Body
              data={summary ? filteredData?.slice(0, 8) : filteredData}
              render={(data, i) => (
                <Table.Row key={i + 1}>
                  <div>{data?.category}</div>
                  <div> {data?.address}</div>
                  <div>{formatDateAndTime(data?.createdAt)}</div>
                  <Menus.Toggle id={data?._id} />

                  <Menus.List id={data?._id}>
                    <li>
                      <Menus.Button
                        disabled={isPending}
                        onClick={() => {
                          deleteTimeline(data?._id);
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
