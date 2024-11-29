import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFileInput = styled.input`
  align-self: flex-start;
  color: var(--text-color-primary);

  &::file-selector-button {
    border: none;
    background: none;
    outline: none;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-right: 1rem;
    color: var(--background-color-light);
    font-weight: 600;
    letter-spacing: 0.1rem;
    background-color: var(--highlight-color);
  }
`;

function FileInput({ name, register, onChange }) {
  return (
    <StyledFileInput
      type="file"
      name={name}
      id={name}
      onChange={onChange}
      {...register}
    />
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.object,
  onChange: PropTypes.func,
};

export default FileInput;
