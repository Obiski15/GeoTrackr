import { Controller, useForm } from "react-hook-form";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useCreateTimeline } from "../map/useCreateTimeline";

import SelectComponent from "../../ui/SelectComponent";
import CustomDateInput from "../../ui/CustomDateInput";
import ErrorMessage from "../../ui/ErrorMessage";
import MiniSpinner from "../../ui/MiniSpinner";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";

// datepicker css file
import "react-datepicker/dist/react-datepicker.css";

const Text = styled.p`
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin-bottom: 2rem;
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
`;

const FormButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 2rem;
  bottom: 2rem;
  gap: 1rem;
`;

function AddLocationForm({ handleCloseModal, property, isLoading, error }) {
  const desiredAddress = `${property.street}, ${property.city}, ${property.country}`;
  const address =
    desiredAddress.includes(undefined) || desiredAddress.includes(null)
      ? property.formatted
      : desiredAddress;

  const { isPending, mutate: addToTimeline } = useCreateTimeline();
  const { control, handleSubmit, register, reset } = useForm();

  function onSubmit(data) {
    addToTimeline(
      {
        ...data,
        position: [property.lat, property.lon],
        countryCode: property.country_code.toUpperCase(),
        countryName: property.country,
        category: data.category.value,
        locality: property.street,
        city: property.city,
      },
      {
        onSuccess: handleCloseModal,
      }
    );
  }

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  if (isLoading) return <MiniSpinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>{`welcome, Let's add "${address}" to your visited Locations 😎`}</Text>
      <Form>
        <FormRow>
          <p>Location:</p>
          <FormInput
            value={address}
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
          <Button type="danger" onClick={reset}>
            Cancel
          </Button>
          <Button disabled={isPending}>Confirm</Button>
        </FormButtons>
      </Form>
    </form>
  );
}

AddLocationForm.propTypes = {
  handleCloseModal: PropTypes.func,
  property: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default AddLocationForm;
