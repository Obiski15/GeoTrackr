import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "./authApi";

export function useSignup() {
  const queryClient = useQueryClient();
  const {
    data: user,
    mutate,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: ({ email, username, password, confirmPassword, image }) =>
      signup({ email, username, password, confirmPassword, image }),
    mutationKey: ["user"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return { user, mutate, error, isLoading };
}
