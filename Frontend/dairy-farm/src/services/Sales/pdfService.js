import APIClient from "./api-client";

const apiClient = new APIClient("/invoice");

class PdfService {
  download() {
    return apiClient.getAll();
  }
}

export default new PdfService();
