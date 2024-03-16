import APIClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient("/purchase");

const usePurcahse = () =>
  useQuery({
    queryKey: ["purchase"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24h
  });

export default usePurcahse;
