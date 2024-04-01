import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/purchase");

const usePurcahse = (id) =>
  useQuery({
    queryKey: ["purchase", id],
    queryFn: () => apiClient.get(id),
  });

export default usePurcahse;
