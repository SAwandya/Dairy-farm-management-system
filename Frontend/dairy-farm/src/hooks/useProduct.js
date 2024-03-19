import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/products");

const useProduct = (id) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => apiClient.get(id),
  });

export default useProduct;
