import ISchoolData from "./school.types";
import { TeacherData } from "./teacher.types";

export class IStudentData {
  studentid!: number;
  name!: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  dateofbirth?: string;
  school?: ISchoolData;
  teacher?: TeacherData;
}
