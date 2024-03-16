import APIClient from "./api-client";

const apiClient = new APIClient("/products");

class ProductService {
  Update(params, product) {
    return apiClient.put(params, product);
  }
  Delete(params) {
    return apiClient.delete(params);
  }
}

export default new ProductService();
