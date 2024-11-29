import styled from "styled-components";

import { useThemeContext } from "../../context/ThemeProvider";

import Heading from "../../ui/components/Heading";

const StyledTheme = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--tertiary-color);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  gap: 1rem;
`;

const Toggle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & label {
    font-size: 1.4rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  letter-spacing: 0.2rem;
`;

function Theme() {
  const { activeTheme, setActiveTheme } = useThemeContext();

  function handleActiveTheme(e) {
    setActiveTheme(e.target.value);
  }

  return (
    <StyledTheme>
      <Heading as="h3">Theme</Heading>
      <Toggle>
        <Label htmlFor="dark-theme">Dark</Label>
        <input
          id="dark-theme"
          type="radio"
          name="theme"
          value="dark-mode"
          onChange={handleActiveTheme}
          checked={activeTheme === "dark-mode"}
        />
      </Toggle>
      <Toggle>
        <Label htmlFor="light-theme">Light</Label>
        <input
          id="light-theme"
          type="radio"
          name="theme"
          value="light-mode"
          onChange={handleActiveTheme}
          checked={activeTheme === "light-mode"}
          // disabled field beacause there is no available style
          disabled
        />
      </Toggle>
    </StyledTheme>
  );
}

export default Theme;
