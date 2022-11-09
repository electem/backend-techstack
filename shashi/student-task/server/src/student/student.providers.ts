/* eslint-disable prettier/prettier */
import { Student } from './student.entity';

export const StudentProviders = [
  {
    provide: 'student',
    useValue: Student,
  },
];
