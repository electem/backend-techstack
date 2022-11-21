/* eslint-disable prettier/prettier */
import School from "./school";
export interface Student {
  studentid: number;
  studentname: string;
  address: string;
  email: string;
  gender: string;
  phonenumber: number;
  dob: Date;
  school: School;
}
