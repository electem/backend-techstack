import { Department } from "./department.types";
export class Company {
  id?: number;
  name?: string;
  email?: string;
  location?: string;
  department?: Department[];
}
