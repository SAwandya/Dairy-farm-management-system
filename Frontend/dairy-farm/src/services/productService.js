import APIClient from "./api-client";

const apiClient = new APIClient("/product");

class ProductService {
  Update(params, product) {
    return apiClient.put(params, product);
  }
}

export default new ProductService();
