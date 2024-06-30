import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.dark-mode {
        // dark mode 
          --secondary-color: #253541; 
          --tertiary-color: #2F4251; 
          --primary-color: #1C2730;
          --text-color-secondary: #d3d3d3;
          --text-color-primary: #ffffff; 
          --highlight-color-bright: #4AA0E0; 
          --highlight-color: #5F9EE7; 
          --accent-color: #3888C3; 
          --lighter-error-color: #FF9999;
          --light-error-color: #FF6666; 
          --error-color: #ff1e00; 
          --background-color-light: #384654;
          --backdrop-color : rgba(255, 255, 255, 0.1);

          /* disabled field */
          --disabled-button: #7a7a7a;
    }

    &.light-mode {
      /* no style available yet, feature is disabled */
    } 
  }

  *,
  *::before,
  *::after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--tertiary-color) var(--primary-color);
    scroll-behavior: smooth;

    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Roboto", sans-serif;
    overflow-wrap: break-word;
    background-color: var(--primary-color);
    color: var(--text-color-primary);
    line-height: 1.5;
    font-size: 1.6rem ;
    transition: color 0.3s, background-color 0.3s;
  }

  button {
    cursor: pointer;
    background: none;
    outline: none;
  }

  *:disabled {
    cursor: no-drop;
    background: none;
    color: var(--disabled-button);
  }

  *:disabled:hover{
    background: none;
    color: var(--disabled-button);
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  ul {
    list-style: none; 
  }

  /* modified react-datepicker default styles */
  .react-datepicker-wrapper{
    display: block;
    width: 100%;
  }

  .react-datepicker__input-container .react-datepicker__calendar-icon{
    padding: 1rem 0.5rem 0.5rem 0.5rem;
  }

  /* adding dark mode for map */
  .leaflet-layer,
  .leaflet-control-attribution {
    filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
`;

export default GlobalStyles;
