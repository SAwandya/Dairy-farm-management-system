import APIClient from "./api-client";

const apiClient = new APIClient("/carts");

class CartService {
  post(cart) {
    return apiClient.post(cart);
  }
  delete(cartId) {
    return apiClient.delete(cartId);
  }
}

export default new CartService();
