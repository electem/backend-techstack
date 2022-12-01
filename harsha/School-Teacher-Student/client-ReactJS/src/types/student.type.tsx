import { School } from "./school.type";

export interface Student {
  studentId?: number | null;
  studentName?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  email?: string;
  phoneNo?: number;
  createdDate?: string;
  school?: School;
}
