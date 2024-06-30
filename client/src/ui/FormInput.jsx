import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import FormError from "./FormError";

const StyledFormInput = styled.div`
  width: 100%;

  & div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    & svg {
      position: absolute;
      color: var(--text-color-primary);
      right: 2rem;
      top: 1.2rem;
    }
  }
`;

const FieldInput = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 2px solid var(--tertiary-color);
  background-color: var(--tertiary-color);
  color: var(--text-color-primary);
  font-size: 1.5rem;
`;

const FieldLabel = styled.label`
  color: var(--text-color-primary);
  text-transform: capitalize;
  font-size: 1.5;
`;

function FormInput({
  name,
  placeholder,
  type,
  value,
  onChange,
  register,
  error,
  readOnly,
  label,
}) {
  const [passwordInputType, setPasswordInputType] = useState(type);

  return (
    <StyledFormInput>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <div>
        <FieldInput
          id={name}
          type={type !== "password" ? type : passwordInputType}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
          {...register}
        />

        {type === "password" && (
          <>
            {passwordInputType === "password" ? (
              <LiaEye onClick={() => setPasswordInputType("text")} />
            ) : (
              <LiaEyeSlash onClick={() => setPasswordInputType("password")} />
            )}
          </>
        )}
        {error && <FormError errorMessage={error} />}
      </div>
    </StyledFormInput>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,

  //for not changing values
  readOnly: PropTypes.bool,

  // for sign up field
  error: PropTypes.string,
  register: PropTypes.object,
};

export default FormInput;
