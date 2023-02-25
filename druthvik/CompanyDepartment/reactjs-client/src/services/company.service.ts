/* eslint-disable @typescript-eslint/no-unused-expressions */

import http from '../http-common'
import { Company } from '../types/company.types'
import { CompanyDelete } from '../types/companydelete.types'
import authHeader from './auth-header'
const schooldelete = new CompanyDelete()
const token = localStorage.getItem('token')
class CompnayService {
  async getAllCompanies (pageNumber: number, pageSize: number, searchString: string) {
    return http.get(
      `/company?page=${pageNumber}&size=${pageSize}&seachedString=${searchString}`
    )
  }

  async getCompanies () {
    return http.get('/company/company')
  }

  async getAllDepartments () {
    return http.get('/department', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async createCompany (company: Company) {
    return http.post<Company>('/company', company)
  }

  async getCompanyById (id: string) {
    return http.get<Company>(`/company/${id}`)
  }

  async deleteCompany (ids: number[]) {
    schooldelete.ids = ids
    console.log(ids)
    return http.delete('/company/delete', { data: schooldelete })
  }
}

export default new CompnayService()
