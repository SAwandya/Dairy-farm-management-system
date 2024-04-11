import APIClient from "./api-client";

const apiClient = new APIClient("/carts");

class CartService {
  post(cart) {
    return apiClient.post(cart);
  }
}

export default new CartService();
