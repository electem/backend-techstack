import { Student } from './model/student';

export class RankAllotment {
  studentList: Student[] = [];

  constructor(studentsList: Student[]) {
    this.studentList = studentsList;
  }

  calculateAvgOfAllTheStudents(): void {
    for (const student of this.studentList) {
      const subjects = student.subject;
      let totalMark = 0;
      for (const subject of subjects) {
        totalMark += subject.mark.scoredMarks;
      }
      student.avgMarks = totalMark / student.subject.length;
    }
  }
  sortByAverage() {
    return this.studentList.sort(this.sortStudents);
  }

  sortStudents(a: Student, b: Student) {
    if (a.avgMarks < b.avgMarks) {
      return 1;
    }
    if (a.avgMarks > b.avgMarks) {
      return -1;
    }
    return 0;
  }
}
