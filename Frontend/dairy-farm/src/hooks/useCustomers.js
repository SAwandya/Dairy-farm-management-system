import APIClient from "../services/Sales/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient("/customers");

const useCustomers = () =>
  useQuery({
    queryKey: ["customers"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24h
  });

export default useCustomers;
