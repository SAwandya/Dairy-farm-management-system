import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/salesdelivery");

const useDelivery = (id) =>
  useQuery({
    queryKey: ["salesdelivery", id],
    queryFn: () => apiClient.get(id),
  });

export default useDelivery;
