/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  public async createStudent(studentDto: StudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(studentDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllStudents(): Promise<Student[]> {
    const studentschoolimage = await this.studentRepository
    .createQueryBuilder('students')
      .select(['students', 'school'])
      .leftJoinAndSelect('students.school', 'school')
      .leftJoinAndSelect('students.image', 'image')
      .getMany();
      return studentschoolimage;
  }

   async studentbyId(id: number): Promise<Student> {
    const studentschoolimage = await this.studentRepository
    .createQueryBuilder('students')
      .select(['students', 'school'])
      .leftJoinAndSelect('students.school', 'school')
      .leftJoinAndSelect('students.image', 'image')
      .where("students.studentid= :studentId", { studentId: id })
      .getOne();
    return studentschoolimage;
  }

  public async updateStudent(studentDto: StudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(studentDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async removeStudent(id: number): Promise<void> {
    const school = await this.studentbyId(id);
    await this.studentRepository.remove(school);
  }
}
