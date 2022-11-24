import ISchoolData from "./school.types";
import { TeacherData } from "./teacher.types";
import { Files } from "./file.type";
export class IStudentData {
  studentid?: number | null;
  name!: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  dateofbirth?: string;
  school?: ISchoolData;
  teacher?: TeacherData;
  file?: Files;
}
