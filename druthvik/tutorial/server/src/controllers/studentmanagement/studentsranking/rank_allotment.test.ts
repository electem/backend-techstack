import { Student } from './model/student';
import { RankAllotment } from '../studentsranking/rank_allotment';

const student: Student[] = [
  {
    name: 'John',
    subjects: [
      {
        name: 'Maths',
        semester: '2',
        mark: {
          scoredmarks: 67,
          maxmarks: 125,
        },
      },
      {
        name: 'science',
        semester: '2',
        mark: {
          scoredmarks: 68,
          maxmarks: 127,
        },
      },
    ],
  },
  {
    name: 'kennedy', //loaded student array
    subjects: [
      {
        name: 'social',
        semester: '2',
        mark: {
          scoredmarks: 90,
          maxmarks: 125,
        },
      },
      {
        name: 'english',
        semester: '2',
        mark: {
          scoredmarks: 80,
          maxmarks: 127,
        },
      },
    ],
  },
];

describe('calculate average of students', () => {
  test('students with different subject', async () => {
    const data2 = student;
    data2[1].subject.push({
      //added extra subject to 2nd student
      name: 'science',
      semester: '2',
      mark: {
        scoredmarks: 100,
        maxmarks: 127,
      },
    });
    data2.push({
      name: 'mark',
      subjects: [
        {
          name: 'physics',
          semester: '2',
          mark: {
            scoredmarks: 90,
            maxmarks: 125,
          }, //added new students + subject
        },
        {
          name: 'chemistry',
          semester: '2',
          mark: {
            scoredmarks: 80,
            maxmarks: 127,
          },
        },
        {
          name: 'maths',
          semester: '2',
          mark: {
            scoredmarks: 55,
            maxmarks: 127,
          },
        },
      ],
    });
    const rankAllotment = new RankAllotment(data2); // 3 subs retrived in kennedy
    rankAllotment.calculateAvgOfAllTheStudents();
    expect(student[0].avgMarks).toBe(67.5);
    expect(student[1].avgMarks).toBe(90);
    expect(student[2].avgMarks).toBe(75);
  });
});
describe('calculate average of students', () => {
  test('should return averge of marks', async () => {
    const data = student;
    data[0].avgMarks = 67.5;
    data[1].avgMarks = 90;
    data[2].avgMarks = 75;

    const rankAllotment = new RankAllotment(data);
    const sortStudents = rankAllotment.sortByAverage();
    expect(student[0].name).toBe('kennedy');
    expect(student[1].name).toBe('mark');
    expect(student[2].name).toBe('John');
  });
});
