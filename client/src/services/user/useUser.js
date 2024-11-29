import { useQuery } from "@tanstack/react-query";
import { getUser } from "./userApi";

export function useUser() {
  const { isLoading, data, error } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  return { isLoading, data, error };
}
