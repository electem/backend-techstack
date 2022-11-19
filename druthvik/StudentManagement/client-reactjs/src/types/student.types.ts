import ISchoolData from "./school.types";
export class IStudentData {
  studentid?: number | null;
  name!: string;
  address?: string;
  phonenumber?: number;
  email?: string;
  gender?: string;
  dateofbirth?: string;
  school?: ISchoolData;
}
