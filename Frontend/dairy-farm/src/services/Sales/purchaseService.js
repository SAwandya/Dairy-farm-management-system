import APIClient from "./api-client";

const apiClient = new APIClient("/purchase");

class PurchaseService {
  Purchase(purchase) {
    return apiClient.post(purchase);
  }

  Approve(params, approve){
      return apiClient.put(params, approve);
  }

  Delete(params){
    return apiClient.delete(params);
  }
  
  Update(params, config){
    const newparams = 'update/' + params;
    return apiClient.put(newparams, config);
  }
}

export default new PurchaseService();
