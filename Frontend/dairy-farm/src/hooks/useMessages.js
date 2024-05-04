import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/Sales/api-client";

const apiClient = new APIClient("/messages");

const useMessage = (id) =>
  useQuery({
    queryKey: ["messages", id],
    queryFn: () => apiClient.get(id),
  });

export default useMessage;
