/* eslint-disable prettier/prettier */
import { Teacher } from './teacher.entity';

export const TeacherProviders = [
  {
    provide: 'teacher',
    useValue: Teacher,
  },
];
