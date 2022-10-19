import { Category } from './category.model';

export class Tutorial {
  id?: any;
  title?: string;
  description?: string;
  author?: string;
  categories?: Category[];
  countries?: string;
  timeZone?: string;
  creatDate?: string;
}
