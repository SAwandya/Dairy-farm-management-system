import APIClient from "./api-client";

const apiClient = new APIClient("/customers");

class UserService {
    CreateUser(user) {

        return apiClient.post(user);
    }
}

export default new UserService();