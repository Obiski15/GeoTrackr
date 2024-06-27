import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";

const StyledVisitDashboard = styled.div`
  width: 100%;

  & button {
    width: 100%;
    letter-spacing: 0.3rem;
    border-radius: 5rem;
  }
`;

function VisitDashboard() {
  const navigate = useNavigate();
  return (
    <StyledVisitDashboard>
      <Button
        iconPosition="right"
        Icon={<HiOutlineArrowUpRight />}
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </Button>
    </StyledVisitDashboard>
  );
}

export default VisitDashboard;
