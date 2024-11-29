import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import styled from "styled-components";

import { useUser } from "../../services/user/useUser";

import ErrorMessage from "../../ui/components/ErrorMessage";
import useLogout from "../../services/auth/useLogout";
import Heading from "../../ui/components/Heading";
import Button from "../../ui/components/Button";
import Modal from "../../ui/components/Modal";
import EditProfile from "./EditProfile";

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

const ProfilePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--background-color-light);
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
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

const Dummy = styled.p`
  width: ${(props) => props.width};
  background-color: var(--background-color-light);
  border-radius: 0.5rem;
  height: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

function UserMenu() {
  const { data: user, isLoading, error: userError } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const navigate = useNavigate();

  return (
    <Modal>
      <StyledUserMenu>
        {isLoading ? (
          <>
            <ProfilePicture />
            <Profile>
              <Dummy width={"100%"} />
              <Dummy width={"50%"} />
            </Profile>
          </>
        ) : (
          <>
            <ProfilePicture>
              <Img
                src={
                  user?.data?.user?.image
                    ? user?.data?.user?.image
                    : "/dummy-avatar.png"
                }
                alt="user-profile"
              />
            </ProfilePicture>
            <Profile>
              <Heading as="h4">
                {user ? user?.data?.user?.username : "******"}
              </Heading>

              {!user ? (
                userError && !userError.code.toString().startsWith("5") ? (
                  <Buttons>
                    <Button type="auth" onClick={() => navigate("/auth/login")}>
                      Login
                    </Button>
                    <Button
                      type="auth"
                      onClick={() => navigate("/auth/signup")}
                    >
                      Sign Up
                    </Button>
                  </Buttons>
                ) : (
                  <ErrorMessage>{userError.message}</ErrorMessage>
                )
              ) : (
                <Buttons>
                  <Modal.Opens name="edit-profile">
                    <Button
                      Icon={<CiEdit />}
                      disabled={isLoggingOut}
                      iconPosition="left"
                    >
                      Edit Profile
                    </Button>
                  </Modal.Opens>
                  <Button
                    type="danger"
                    disabled={isLoggingOut}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                  <Modal.Window name="edit-profile">
                    <EditProfile user={user?.data?.user} />
                  </Modal.Window>
                </Buttons>
              )}
            </Profile>
          </>
        )}
      </StyledUserMenu>
    </Modal>
  );
}

export default UserMenu;
