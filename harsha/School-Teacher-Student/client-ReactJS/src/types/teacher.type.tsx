import { School } from "./school.type";

export interface Teacher {
  teacherId?: number;
  teacherName?: string;
  gender?: string;
  address?: string;
  email?: string;
  phoneNo?: number;
  createdDate?: string;
  schools?: School[];
}
