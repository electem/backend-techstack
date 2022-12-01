/* eslint-disable */
import { Student } from "./student";
import { Teacher } from "./teacher";
export default interface School {
  schoolid: number;
  schoolname: string;
  address: string;
  teacher: Teacher[];
  students: Student[];
}
