import APIClient from "./api-client";

const apiClient = new APIClient("/purchase");

class PurchaseService {
  Purchase(purchase) {
    return apiClient.post(purchase);
  }
}

export default new PurchaseService();
