import http from "../http-common";
import { Company } from "../types/company.types";

class CompnayService {
  getAllCompanies(pageNumber: number, pageSize: number) {
    return http.get(`/company?page=${pageNumber}&size=${pageSize}`);
  }

  getCompanies() {
    return http.get("/company/company");
  }
  getAllDepartments() {
    return http.get("/department");
  }

  createCompany(school: Company) {
    return http.post<Company>("/company", school);
  }
  getCompanyById(id: string) {
    return http.get<Company>(`/company/${id}`);
  }
}

export default new CompnayService();
