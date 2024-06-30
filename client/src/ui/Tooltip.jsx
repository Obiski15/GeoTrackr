import { cloneElement, createContext, useContext, useState } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledTooltip = styled.span`
  width: 120px;
  background-color: var(--tertiary-color);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: fixed;
  font-size: 1.2rem;
  bottom: ${(props) => props.coords.y}px;
  right: ${(props) => props.coords.x}px;

  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    margin-right: -5px;
    border-width: 5px;
    border-style: solid;

    ${(props) => {
      switch (props.position) {
        case "bottom":
          return css`
            bottom: 100%;
            left: 40%;
            border-color: transparent transparent var(--tertiary-color)
              transparent;
          `;
        case "left":
          return css`
            bottom: 40%;
            left: 100%;
            border-color: transparent transparent transparent
              var(--tertiary-color);
          `;

        default:
          null;
      }
    }}
  }
`;

const TooltipContext = createContext();
function Tooltip({ children }) {
  const [tooltipName, setTooltipName] = useState("");
  const [position, setPosition] = useState("");
  const [coords, setCoords] = useState("");

  function close() {
    setTooltipName("");
  }
  const open = setTooltipName;

  return (
    <TooltipContext.Provider
      value={{
        close,
        open,
        tooltipName,
        coords,
        setCoords,
        position,
        setPosition,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

function Button({ name, children, position, onClick }) {
  const { open, close, setCoords, setPosition } = useContext(TooltipContext);

  function handleMouseEnter(e) {
    setPosition(position);
    const rect = e.target.closest("button").getBoundingClientRect();

    switch (position) {
      case "bottom":
        setCoords({
          x: window.innerWidth - rect.right - rect.width,
          y: rect.bottom + 8,
        });
        break;

      case "left":
        setCoords({
          x: window.innerWidth - rect.x + 10,
          y: window.innerHeight - rect.bottom + rect.height / 4,
        });
        break;

      default:
        null;
        break;
    }

    open(name);
  }

  function handleMouseLeave() {
    close();
  }

  function handleClick() {
    onClick?.();
    close();
  }

  return cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
  });
}

function TooltipText({ name, children }) {
  const { tooltipName, coords, position } = useContext(TooltipContext);

  if (!name || name !== tooltipName) return null;

  return (
    <StyledTooltip coords={coords} position={position}>
      {children}
    </StyledTooltip>
  );
}

Tooltip.Button = Button;
Tooltip.TooltipText = TooltipText;

Tooltip.propTypes = {
  children: PropTypes.any.isRequired,
};

TooltipText.propTypes = {
  name: PropTypes.any.isRequired,
  children: PropTypes.any,
};

export default Tooltip;
