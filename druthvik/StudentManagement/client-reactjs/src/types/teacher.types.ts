import ISchoolData from "./school.types";
export class TeacherData {
  teacherid?: number | null;
  name?: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  school?: ISchoolData[];
}
