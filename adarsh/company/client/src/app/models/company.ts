import { Department } from "./depertment";

export class Company {
  id?: number;
  name?: string;
  address?: string;
  email?: string;
  createdDate?: Date;
  depertement?:Department[];
 
}
