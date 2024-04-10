import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/payments");

const usePayment = (id) =>
  useQuery({
    queryKey: ["payments", id],
    queryFn: () => apiClient.get(id),
  });

export default usePayment;
