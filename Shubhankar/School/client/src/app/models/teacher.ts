import { School } from "./school";

export interface Teacher {
  id?: number;
  teachername?: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  gender?: string;
  createdAt?: Date;
  schools?:School[];
}
