import http from "../http-common";
import ICustomerData from "../types/customer.types";
class CustomerDataService {
  async getAllCustomers() {
    return await http.get("/customer");
  }
}
export default new CustomerDataService();
