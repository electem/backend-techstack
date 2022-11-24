/* eslint-disable */
import { Student } from "./student";
import { Teacher } from "./teacher";
export default interface School {
  id: number;
  name: string;
  address: string;
 teachers:Teacher[];
 students:Student[];
}