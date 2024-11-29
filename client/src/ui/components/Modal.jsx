import { cloneElement, createContext, useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";

const StyledButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
`;

const StyledWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--primary-color);
  padding: 5rem 2rem 2rem 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  min-height: 200px;
  transition: background-color 4s;
  animation: slide-in 0.5s ease-in-out;

  @media only screen and (max-width: 500px) {
    width: 300px;
  }

  @keyframes slide-in {
    from {
      top: -500%;
      bottom: 0;
    }
    to {
      top: 0;
    }
  }
`;

const ModalContext = createContext();
const ICON_SIZE = 30;

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState("");

  function close() {
    setIsOpen("");
  }

  const open = setIsOpen;

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Opens({ name, children }) {
  const { open } = useContext(ModalContext);
  function handleClick() {
    open(name);
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ name, children }) {
  const { close, isOpen } = useContext(ModalContext);

  if (!name || name !== isOpen) return null;

  return createPortal(
    <Overlay>
      <StyledWindow>
        <StyledButton>
          <Button onClick={close} type="secondary">
            <IoCloseOutline size={ICON_SIZE} />
          </Button>
        </StyledButton>

        {cloneElement(children, { handleCloseModal: close })}
      </StyledWindow>
    </Overlay>,
    document.body
  );
}

Modal.Opens = Opens;
Modal.Window = Window;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.any,
};

export default Modal;
