import { Student } from './student.entity';
export const studentProviders = [
  {
    provide: 'STUDENT_REPOSITORY',
    useValue: Student,
  },
];
