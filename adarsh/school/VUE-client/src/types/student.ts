/* eslint-disable prettier/prettier */
import School from "./school";
export interface Student {
  id: number;
  name: string;
  address: string;
  email: string;
  gender:string;
  phone:number;
  dateOfBirth:string;
  schools:School;
}
