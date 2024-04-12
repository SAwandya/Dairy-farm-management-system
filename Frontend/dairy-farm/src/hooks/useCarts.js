import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/carts");

const useCart = (id) =>
  useQuery({
    queryKey: ["carts", id],
    queryFn: () => apiClient.get(id),
  });

export default useCart;
