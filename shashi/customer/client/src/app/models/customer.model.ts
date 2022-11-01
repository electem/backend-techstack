import { Unit } from './unit.model';
export class Customer {
  id?: number;
  customername?: string;
  status?: string;
  street?: string;
  postalcode?: number;
  phonenumber?: number;
  units?: Unit[];
}
