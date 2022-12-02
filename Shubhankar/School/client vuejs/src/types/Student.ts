import School from "./School";

/* eslint-disable */
export default interface Student {
    studentid: number;
    studentname: string;
    address: string;
    phonenumber:string;
    email:string;
    gender:string;
    dateofbirth:string;
    createdAt:Date;
    school:School;
    
}