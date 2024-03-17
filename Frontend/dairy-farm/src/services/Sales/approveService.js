import APIClient from "./api-client";

const apiClient = new APIClient("/customers/approve");

class ApproveService {
  Approve(params, approvel) {
    return apiClient.put(params, approvel);
  }
}

export default new ApproveService();
