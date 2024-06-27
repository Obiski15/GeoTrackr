import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import ButtonIcon from "./ButtonIcon";
import Heading from "./Heading";

const StyledHeader = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 3rem;
  padding: 0.5rem;
`;

function Header({ children }) {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <ButtonIcon onClick={() => navigate(-1)}>
        <RiArrowLeftSLine />
      </ButtonIcon>
      {children && (
        <Heading as="h4" align="center">
          {children}
        </Heading>
      )}
    </StyledHeader>
  );
}

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;
