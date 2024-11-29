import { Controller, useForm } from "react-hook-form";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useAddToTimeline } from "../../services/timeline/useAddToTimeline";
import { useLocation } from "../../services/location/useLocation";
import { useUser } from "../../services/user/useUser";

import SelectComponent from "../../ui/components/SelectComponent";
import CustomDateInput from "../../ui/components/CustomDateInput";
import ErrorMessage from "../../ui/components/ErrorMessage";
import MiniSpinner from "../../ui/components/MiniSpinner";
import FormInput from "../../ui/components/FormInput";
import Button from "../../ui/components/Button";

// datepicker css file
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const NoUser = styled.div`
  padding: 1rem;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & button {
    margin: 0 auto;
    padding: 1.5rem 2rem;
    font-weight: normal;
    font-size: 1.5rem;
  }
`;

const Form = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  & > p {
    min-width: 30%;
  }
`;

const FormButtons = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  bottom: 2rem;
  right: 2rem;
`;

const Heading = styled.p`
  letter-spacing: 0.1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

function AddLocationForm({ handleCloseModal, position }) {
  const navigate = useNavigate();
  const {
    data: { locality, city, countryName, latitude, longitude, countryCode },
    isLoading,
    error,
  } = useLocation(position);
  const { isLoading: isAddingToTimeline, addToTimeline } = useAddToTimeline();
  const { control, handleSubmit, register } = useForm();
  const { data: user } = useUser();

  const address = `${locality}, ${city}, ${countryName}`;

  function onSubmit(data) {
    addToTimeline(
      {
        ...data,
        position: [latitude, longitude],
        countryCode,
        countryName,
        locality,
        category: data.category.value,
        city,
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      }
    );
  }

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (isLoading) return <MiniSpinner />;

  return (
    <>
      {!user?.data?.user ? (
        <NoUser>
          <Button
            type="auth"
            onClick={() => {
              handleCloseModal();
              navigate("/auth/login");
            }}
          >
            Sign in to add location to your timeline
          </Button>
        </NoUser>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading>{`welcome, Let's add "${address}" to your visited Locations 😎`}</Heading>
          <Form>
            <FormRow>
              <p>Location:</p>
              <FormInput
                value={address}
                defaultValue={address}
                name="address"
                type="text"
                readOnly={true}
                register={{ ...register("address") }}
              />
            </FormRow>

            <FormRow>
              <p>Category:</p>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectComponent field={{ ...field }} />}
              />
            </FormRow>

            <FormRow>
              <p>Date:</p>
              <Controller
                name="date"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    showIcon
                    toggleCalendarOnIconClick
                    icon={<FaRegCalendarAlt color="black" />}
                    selected={field.value}
                    customInput={<CustomDateInput />}
                  />
                )}
              />
            </FormRow>

            <FormButtons>
              <Button
                type="danger"
                onClick={handleCloseModal}
                disabled={isAddingToTimeline}
              >
                Cancel
              </Button>
              <Button disabled={isAddingToTimeline}>Confirm</Button>
            </FormButtons>
          </Form>
        </form>
      )}
    </>
  );
}

AddLocationForm.propTypes = {
  handleCloseModal: PropTypes.func,
  position: PropTypes.array,
};

export default AddLocationForm;
