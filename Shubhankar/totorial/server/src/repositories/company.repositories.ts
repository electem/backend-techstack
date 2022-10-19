import {getRepository, IsNull} from "typeorm";
import {Company} from '../models/company'

export interface ICompanyData {
    Name: string;
    Address: string;
    email: string
}

    export   const getCompany  = async () :Promise<Array<Company>> => {
  const CompanyRepository = getRepository(Company);
  return CompanyRepository.find()
    }

  export const createCompany  = async (companyload: ICompanyData) :Promise<Company> => {
    const CompanyRepository = getRepository(Company);
    const company = new Company()
    return CompanyRepository.save({
      ...company,
      ...companyload
    })
  }
export const getCompanys  = async (id: number) :Promise<Company | null> => {
    const CompanyRepository = getRepository(Company);
    const company = await CompanyRepository.findOne({id: id})
    if (!company) return null
    return company
  }
  export const deleteCompanys =async(id: number):Promise<Company | null> => {
  const CompanyRepository = getRepository(Company);
  const company = await CompanyRepository.delete({ id: id });
   return null

}
//  export const deleteCompany = async ( ) =>{
//     const response = await fetch('http://localhost:8000/company/1', {
//         method: 'DELETE', headers: {
//           },
//         body: null
//     });
//  const company = await response.json( );
//  console.log(company);
//   }



  
