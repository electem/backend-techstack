/* eslint-disable prettier/prettier */
import School from "./school";
export interface Teacher {
  id: number;
  name: string;
  address: string;
  email: string;
  gender:string;
  phone:number;
  schools:School[];
}