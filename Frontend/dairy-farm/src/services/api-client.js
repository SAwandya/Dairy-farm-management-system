import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

class APIClient {
  endpoint;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post = (config) => {
    return axiosInstance.post(this.endpoint, config).then((res) => res.data);
  }

  getAll = () => {
    return axiosInstance.get(this.endpoint, config).then((res) => res.data);
  };
}

export default APIClient;
