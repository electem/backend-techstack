import { createQueryBuilder, Connection, getManager } from 'typeorm';
import { Student } from './model/student';
import { Injectable } from '@nestjs/common';
import { RankAllotment } from './rank_allotment';

export interface IStudentPayload {
  name: string;
  avgMarks?: number;
}

@Injectable()
export class SudentRepository {
  findMany() {
    throw new Error('Method not implemented.');
  }
  sudentRepository: any;

  constructor(
    private readonly connection: Connection,
    private readonly rankAllotment: RankAllotment,
  ) {}

  //This code of block is used to get the students without averge marks
  public getAllSTudents = async (): Promise<Array<Student>> => {
    const entityManager = getManager();
    let stud = [];
    const query = entityManager.createQueryBuilder(Student, 'student');
    stud = await query
      .select(['student', 'subject', 'mark'])
      .leftJoinAndSelect('student.subject', 'subject')
      .innerJoinAndSelect('subject.mark', 'mark')
      .getMany();
    return stud;
  };
  //This code of block is used to get the associated sudent , subject and marks entities.
  public calcStudentAverage = async (): Promise<Array<Student>> => {
    const entityManager = getManager();
    let stud = [];
    const query = entityManager.createQueryBuilder(Student, 'student');
    stud = await query
      .select(['student', 'subject', 'mark'])
      .leftJoinAndSelect('student.subject', 'subject')
      .innerJoinAndSelect('subject.mark', 'mark')
      .getMany();
    const studentavg = new RankAllotment(stud);
    studentavg.calculateAvgOfAllTheStudents();
    return stud;
  };
}
