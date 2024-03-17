import APIClient from "./api-client";

const apiClient = new APIClient("/products/publish");

class PublishService {
  Publish(params, publish) {
    return apiClient.put(params, publish);
  }
}

export default new PublishService();
