import APIClient from "./api-client";

const apiClient = new APIClient("/customers");

class UserService {
    CreateUser(user) {

        return apiClient.post(user);
    }
    delete(user) {
        return apiClient.delete(user);
    }
}

export default new UserService();