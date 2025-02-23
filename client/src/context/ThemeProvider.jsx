import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useLocalStorage("dark-mode", "theme");

  useEffect(() => {
    if (activeTheme === "light-mode") {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }

    if (activeTheme === "dark-mode") {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const mode = useContext(ThemeContext);

  if (!mode)
    throw new Error("Theme context is been used outside of it's provider");

  return mode;
}

export { ThemeProvider, useThemeContext };

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
