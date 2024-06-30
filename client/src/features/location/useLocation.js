import { useQuery } from "@tanstack/react-query";

import { getUserLocation } from "../../services/locationApi";

export function useLocation(position) {
  const {
    data = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["location", position],
    queryFn: () => getUserLocation(position),
  });

  return { data, error, isLoading };
}
