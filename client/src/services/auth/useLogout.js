import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout as logoutAPI } from "./authApi";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: logoutAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Logged out");
      navigate(0);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLoggingOut, error };
}

export default useLogout;
