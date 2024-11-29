import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resetPassword as resetPasswordApi } from "./authApi";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: ({ resetToken, password, confirmPassword }) =>
      resetPasswordApi({ resetToken, password, confirmPassword }),
    mutationKey: ["user"],

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return { isLoading, resetPassword };
}
