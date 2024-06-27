import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteTiimeline } from "../../services/TimelineApi";

export function useDeleteTimeline() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["timeline"],
    mutationFn: deleteTiimeline,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      toast.success("Location Deleted Successfully");
    },

    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending, error };
}