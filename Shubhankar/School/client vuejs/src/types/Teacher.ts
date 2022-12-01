import School from "./School";
/* eslint-disable */
export default interface Teacher {
    teacherid: number;
    teachername: string;
    address: string;
    phonenumber:string;
    email:string;
    gender:string;
    schools:School[];
}