import { customerGroup } from './customergroup.model';
import { Unit } from './unit.model';
export class createCustomer {
  id?: number;
  name?: string;
  phonenumber?: number;
  address?: string;
  status?: string;
  unit?: Unit[] = [];
}
