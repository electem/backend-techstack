import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  public async findAllSchool(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  public async createStudent(studentdto: StudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(studentdto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async findStudentByID(id: number) {
    const postWithQueryBuilder = await this.studentRepository
      .createQueryBuilder('student')
      .select(['student', 'school'])
      .leftJoinAndSelect('student.school', 'school')
      .where('school.id= :id', { id: id })
      .getOne();
    return postWithQueryBuilder;
  }

  public async updateStudent(studentDto: StudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(studentDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
