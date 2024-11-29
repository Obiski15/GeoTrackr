import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./authApi";

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    data: user,
    mutate: loginUser,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    mutationKey: ["user"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return { user, loginUser, error, isLoading };
}
