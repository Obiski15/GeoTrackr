import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormCheckbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;
`;

const Label = styled.p`
  color: var(--text-color-primary);
  font-size: 1.2rem;
  cursor: default;
`;

function FormCheckbox({ label, checked, onChange, onClick }) {
  return (
    <StyledFormCheckbox>
      <input id="label" type="checkbox" checked={checked} onChange={onChange} />
      <Label htmlFor="label" onClick={onClick}>
        {label}
      </Label>
    </StyledFormCheckbox>
  );
}

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FormCheckbox;
