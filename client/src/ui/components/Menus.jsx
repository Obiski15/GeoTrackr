import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useOuterScrollAndClick } from "../../hooks/useOuterScrollAndClick";

const StyledToggle = styled.button`
  border: none;
  color: var(--text-color-primary);
  background-color: var(--background-color-light);
  border-radius: 0.5rem;
  padding: 0.5rem 0.1rem;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  top: ${(props) => props.position.y}px;
  right: ${(props) => props.position.x}px;
  z-index: 1;
  background-color: var(--secondary-color);
  padding: 0.5rem;
  border-radius: 0.7rem;
  min-width: 130px;
  height: auto;

  & li {
    margin: 0.5rem 0.2rem 0rem 0.2rem;
    letter-spacing: 0.1rem;
  }

  & li:not(:last-child) {
    border-bottom: 1px solid var(--text-color-primary);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  text-transform: capitalize;
  padding: 1rem 0.5rem;
  border: none;
  outline: none;
  color: var(--text-color-primary);

  &:focus {
    outline: none;
  }
`;

const MenusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState("");

  function close() {
    setOpenId("");
  }

  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });

    openId !== id || openId === "" ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOuterScrollAndClick(close);

  if (id.length === 0) return null;

  if (id === openId)
    return createPortal(
      <StyledList ref={ref} position={position}>
        {children}
      </StyledList>,
      document.body
    );
}

function Button({ Icon, children, iconPosition, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledButton onClick={handleClick}>
      {Icon && iconPosition === "left" && Icon}
      <span>{children}</span>
      {Icon && iconPosition === "right" && Icon}
    </StyledButton>
  );
}

Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

Toggle.propTypes = {
  id: PropTypes.any.isRequired,
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.any.isRequired,
};

Button.propTypes = {
  iconPosition: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  Icon: PropTypes.any,
};

Menus.Button = Button;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
