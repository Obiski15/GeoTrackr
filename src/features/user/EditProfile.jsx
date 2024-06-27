import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import ImageUpload from "../../ui/ImageUpload";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";

const StyledEditProfile = styled.div`
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

function EditProfile({ handleCloseModal }) {
  const [newName, setNewName] = useState("");
  return (
    <StyledEditProfile>
      <FormInput
        name="previous-name"
        type="text"
        value="Emmanuel mark obi ididididi hdhdh h dhd dhdhd hd d"
        readOnly={true}
        label="Previous Name:"
      />
      <FormInput
        name="new-name"
        type="text"
        placeholder="Update your Name"
        label="New Name:"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <ImageUpload
        onChange={(e) => console.log(e.target.files[0])}
        label="Update Image"
      />

      <Buttons>
        <Button type="danger" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button>Confirm</Button>
      </Buttons>
    </StyledEditProfile>
  );
}

EditProfile.propTypes = {
  handleCloseModal: PropTypes.func,
};

export default EditProfile;
