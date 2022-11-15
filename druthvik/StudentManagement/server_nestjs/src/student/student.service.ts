import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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

  async findStudentByID(studentid: number) {
    const postWithQueryBuilder = await this.studentRepository
      .createQueryBuilder('students')
      .select(['students', 'school', 'file'])
      .leftJoinAndSelect('students.school', 'school')
      .leftJoinAndSelect('students.file', 'file')
      .where('students.studentid= :id', { id: studentid })
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

  public async deleteStudent(id: number): Promise<void> {
    const student = await this.findStudentByID(id);
    await this.studentRepository.remove(student);
  }
}
