import { useForm } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useUpdateUser } from "../../services/user/useUpdateUser";

import ImageUpload from "../../ui/components/ImageUpload";
import FormInput from "../../ui/components/FormInput";
import Button from "../../ui/components/Button";

const StyledEditProfile = styled.form`
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const Buttons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 2rem;
  bottom: 2rem;
  gap: 1rem;
`;

function EditProfile({ handleCloseModal, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      previousUsername: user?.username,
    },
  });
  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit(data) {
    const { username, image, previousUsername } = { ...data };

    if (!username && !image) return;

    updateUser(
      { username: username || previousUsername, image: image?.[0] },
      { onSuccess: handleCloseModal }
    );
  }

  return (
    <StyledEditProfile onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="previousUsername"
        type="text"
        label="Previous Username:"
        readOnly={true}
        register={{
          ...register("previousUsername", {
            required: "Previous Username is required",
          }),
        }}
      />
      <FormInput
        name="username"
        type="text"
        placeholder="Update your Name"
        label="New Username:"
        error={errors?.username?.message}
        register={{
          ...register("username", {
            minLength: {
              value: 5,
              message: "Minimum required length is 5",
            },
            validate: (value, formValues) =>
              value !== formValues.previousUsername ||
              "Username cannot be same as previous",
          }),
        }}
      />

      <ImageUpload label="Update Image" register={{ ...register("image") }} />
      <Buttons>
        <Button
          disabled={isUpdating}
          type="danger"
          onClick={(e) => {
            e.preventDefault();
            console.log(e);
            handleCloseModal();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Confirm</Button>
      </Buttons>
    </StyledEditProfile>
  );
}

EditProfile.propTypes = {
  handleCloseModal: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default EditProfile;
