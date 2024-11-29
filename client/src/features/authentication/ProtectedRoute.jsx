import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { useUser } from "../../services/user/useUser";

import Spinner from "../../ui/components/Spinner";

function ProtectedRoute({ children }) {
  const { error, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(error.message);
      navigate("/auth/login");
    }
  }, [isLoading, error, navigate]);

  if (isLoading) return <Spinner />;

  if (!isLoading && !error) return children;

  return null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
