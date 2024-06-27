import { useQuery } from "@tanstack/react-query";

import { searchLocation } from "../../services/locationApi";

export function useSearchLocation(query, enabled) {
  const {
    data = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["searchLocation", query],
    queryFn: () => searchLocation(query),
    enabled: enabled,
  });

  return { data, error, isLoading };
}
