import APIClient from "./api-client";

const apiClient = new APIClient("/products");

class ProductService {
  Update(params, product) {
    return apiClient.put(params, product);
  }
}

export default new ProductService();
