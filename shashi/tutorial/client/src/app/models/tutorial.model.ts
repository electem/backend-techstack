import { Category } from './categoryTask.model';

export class Tutorial {
  id?: number;
  title?: string;
  description?: string;
  categories?: Category[];
  author?: string;
  timeZone?: string;
  createdAt?: Date;
}
