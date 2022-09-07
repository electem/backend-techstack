import { Category } from './category.model';
export class Tutorial {
  id?: any;
  title?: string;
  description?: string;
  published?: boolean;
  timeZone?: string;
  createdAt?: string;
  categories?: Category[] = [];
}
