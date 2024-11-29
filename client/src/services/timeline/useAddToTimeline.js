import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToTimeline as addToTimelineAPI } from "./TimelineApi";
import toast from "react-hot-toast";

export function useAddToTimeline() {
  const queryClient = useQueryClient();

  const {
    mutate: addToTimeline,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["timeline"],
    mutationFn: addToTimelineAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timeline"],
      });
      toast.success("Location Successfully Added to Timeline");
    },

    onError: (error) => toast.error(error.message),
  });

  return { addToTimeline, isLoading, error };
}
