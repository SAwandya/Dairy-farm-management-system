import APIClient from "./api-client";

const apiClient = new APIClient("/products");

class ProductService {
  Update(params, product) {
    return apiClient.put(params, product);
  }
  Delete(params) {
    return apiClient.delete(params);
  }
  Add(batch) {
    const newparams = "releasedadd";
    return apiClient.postOne(batch, newparams)
  }
}

export default new ProductService();
