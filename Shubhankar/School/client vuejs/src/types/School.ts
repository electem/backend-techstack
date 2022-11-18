import Student from "./Student";
import Teacher from "./Teacher";

/* eslint-disable */
export default interface School {
    schoolid: null;
    schoolname: string;
    address: string;
    createdAt: Date;
    teachers:Teacher[];
    students:Student[];
}