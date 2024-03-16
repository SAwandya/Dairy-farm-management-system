import APIClient from "./api-client";

const apiClient = new APIClient("/messages");

class MessageService {
  send(message) {
    return apiClient.post(message);
  }
 
}

export default new MessageService();
