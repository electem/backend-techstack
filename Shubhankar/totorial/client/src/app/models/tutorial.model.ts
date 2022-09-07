import { Category } from "./category";
import { Comment } from "./comment";
export class Tutorial {
  id?: number
  title?: string
  description?: string
  published?: boolean
  categories?:  Category[];
  Author?:string
  country?:string
  name?:string
  timezone?:string
  createdAt?:Date
  comments?:string
 }
