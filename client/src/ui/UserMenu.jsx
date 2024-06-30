import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import styled from "styled-components";

import EditProfile from "../features/user/EditProfile";

import Heading from "./Heading";
import Button from "./Button";
import Modal from "./Modal";

const StyledUserMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--background-color-light);
  border-radius: 0.5rem;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
`;

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Profile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

function UserMenu() {
  const navigate = useNavigate();
  return (
    <StyledUserMenu>
      <Modal>
        <ProfilePicture src="/dummy-avatar.png" alt="user-avatar" />
        <Profile>
          <Heading as="h4">*******</Heading>
          <AuthButtons>
            <Button type="auth" onClick={() => navigate("/auth/login")}>
              Login
            </Button>
            <Button type="auth" onClick={() => navigate("/auth/signup")}>
              Sign Up
            </Button>
          </AuthButtons>

          {/* for logged in users */}
          {/* <Modal.Opens name="edit-profile">
            <Button Icon={<CiEdit />} iconPosition="left">
              Edit Profile
            </Button>
          </Modal.Opens> */}
          <Modal.Window name="edit-profile">
            <EditProfile />
          </Modal.Window>
        </Profile>
      </Modal>
    </StyledUserMenu>
  );
}

export default UserMenu;
