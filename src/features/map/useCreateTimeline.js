import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createTimeline } from "../../services/TimelineApi";

export function useCreateTimeline() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["timeline"],
    mutationFn: createTimeline,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timeline"],
      });
      toast.success("Location Successfully Added to History");
    },

    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending, error };
}
