import { useQuery } from "@tanstack/react-query";

import { searchLocation } from "./locationApi";

export function useSearchLocation(query) {
  const {
    data = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["searchLocation", query],
    queryFn: () => searchLocation(query),
    enabled: !!query,
  });

  return { data, error, isLoading };
}
