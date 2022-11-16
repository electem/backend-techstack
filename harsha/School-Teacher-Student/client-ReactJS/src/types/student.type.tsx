import { School } from "./school.type";

export interface Student {
  studentId?: number;
  studentName?: string;
  gender?: string;
  dateOfBirth?: Date;
  address?: string;
  email?: string;
  phoneNo?: number;
  createdDate?: string;
  school?: School;
}
