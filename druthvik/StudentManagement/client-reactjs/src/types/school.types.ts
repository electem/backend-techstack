import { IStudentData } from "./student.types";
import { TeacherData } from "./teacher.types";
export default interface ISchoolData {
  schoolid?: number | null;
  name?: string;
  address?: string;
  teacher?: TeacherData;
  students?: IStudentData;
}
