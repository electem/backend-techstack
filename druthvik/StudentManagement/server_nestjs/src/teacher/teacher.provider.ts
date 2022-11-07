import { Teacher } from './teacher.entity';
export const teacherProviders = [
  {
    provide: 'TEACHER_REPOSITORY',
    useValue: Teacher,
  },
];
