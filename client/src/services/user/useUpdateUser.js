import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser as updateUserAPI } from "./userApi";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: updateUserAPI,

    onSuccess: () => {
      toast.success("profile updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    updateUser,
    isUpdating,
    error,
  };
}
