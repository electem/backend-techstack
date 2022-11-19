import { Student } from "./student.type";
import { Teacher } from "./teacher.type";

export interface School {
  schoolId?: number | null;
  schoolName?: string;
  address?: string;
  createdDate?: string;
  teachers?: Teacher[];
  students?: Student[];
}
