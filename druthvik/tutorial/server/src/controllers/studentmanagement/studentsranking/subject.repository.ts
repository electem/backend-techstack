import { getRepository } from 'typeorm';
import { Subject } from './model/subject';

export class ISubjectPayload {
  name: string;
  semester: string;
  studentId: number;
}

export const createSubject = async (
  payload: ISubjectPayload,
): Promise<Subject> => {
  const SubjectRepository = getRepository(Subject);
  const student = new Subject();
  return SubjectRepository.save({
    ...student,
    ...payload,
  });
};
