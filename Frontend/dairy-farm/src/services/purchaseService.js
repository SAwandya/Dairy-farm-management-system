import APIClient from "./api-client";

const apiClient = new APIClient("/purchase");

class PurchaseService {
  Purchase(purchase) {
    return apiClient.post(purchase);
  }

  Approve(params, approve){
      return apiClient.put(params, approve);
  }
}

export default new PurchaseService();
