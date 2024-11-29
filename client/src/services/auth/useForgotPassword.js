import { useMutation, useQueryClient } from "@tanstack/react-query";

import { forgotPassword } from "./authApi";

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["user"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { mutate, isLoading, error };
}
