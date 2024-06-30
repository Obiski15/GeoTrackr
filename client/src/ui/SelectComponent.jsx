import styled from "styled-components";
import PropTypes from "prop-types";
import Select from "react-select";

import { categories } from "../data/data";

const StyledSelectComponent = styled.div`
  flex: 1;
  width: 100%;
`;

function SelectComponent({ field }) {
  const customStyle = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--tertiary-color)",
      border: "none",
      maxWidth: "100%",
      overflow: "hidden",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-color-primary)",
    }),

    input: (provided) => ({
      ...provided,
      color: "var(--text-color-primary)",
    }),

    option: (provided) => ({
      ...provided,
      color: "var(--primary-color)",
      marginBottom: "0.5rem",
    }),
  };

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "var(--background-color-light)",
    },
  });

  return (
    <StyledSelectComponent>
      <Select
        options={categories}
        styles={customStyle}
        theme={customTheme}
        {...field}
      />
    </StyledSelectComponent>
  );
}

SelectComponent.propTypes = {
  field: PropTypes.object.isRequired,
};

export default SelectComponent;
