import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

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

const FormError = styled.span`
  color: var(--error);
  font-size: 1.2rem;
  font-weight: normal;
  letter-spacing: 0.1rem;
  font-style: normal;
  text-transform: capitalize;
`;

function FormInput({
  name,
  placeholder,
  type,
  register,
  error,
  readOnly,
  label,
  defaultValue,
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
          placeholder={placeholder}
          readOnly={readOnly}
          defaultValue={defaultValue}
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
        {error && <FormError>{error}</FormError>}
      </div>
    </StyledFormInput>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.object,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

export default FormInput;
