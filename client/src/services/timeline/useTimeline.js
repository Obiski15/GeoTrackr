import { useQuery } from "@tanstack/react-query";

import { getTimeline } from "./TimelineApi";

export function useTimeline() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["timeline"],
    queryFn: getTimeline,
  });

  return { data, isLoading, error };
}
