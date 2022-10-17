import { customerGroup } from './customergroup.model';

export class createCustomer {
  id?: number;
  name?: string;
  phonenumber?: number;
  address?: string;
  status?: string;
  customergroup: customerGroup[];
}
