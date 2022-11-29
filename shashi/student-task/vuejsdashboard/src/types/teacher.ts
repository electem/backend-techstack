import School from "./school";
export interface Teacher {
  teacherid: number;
  teachername: string;
  address: string;
  email: string;
  gender: string;
  school: School[];
}
