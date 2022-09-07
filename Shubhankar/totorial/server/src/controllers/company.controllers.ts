import { Get, Route, Tags,Post,Path,Body, Delete} from "tsoa";
import {Company} from '../models/company'
import {getCompany,createCompany,getCompanys, ICompanyData,deleteCompanys } from '../repositories/company.repositories'

@Route("Companys")
@Tags("Company")
export default class  CompanyController {
  @Get("/")
  public async getCompany(): Promise<Array<Company>> {
    return getCompany()
  }
  @Post("/")
  public async createCompany(@Body() body: ICompanyData): Promise<Company> {
    return createCompany(body)
  }

  @Get("/:id")
  public async getCompanys(@Path() id: string): Promise<Company | null> {
    return getCompanys(Number(id))
  }
  @Delete("/:id")
  public async deleteCompanys(@Path() id: string): Promise<Company | null> {
    return deleteCompanys(Number(id))
  }
}



