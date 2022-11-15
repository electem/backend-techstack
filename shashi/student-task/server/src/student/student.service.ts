/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentDto } from './student.dto';
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
  public async findAllStudent(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
  async findOneStudent(studentsid: number) {
    const postWithQueryBuilder = await this.studentRepository
      .createQueryBuilder('students')
      .select(['students', 'school'])
      .leftJoinAndSelect('students.school', 'school')
      .leftJoinAndSelect('students.image', 'image')
      .where('students.studentid= :id', { id: studentsid })
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
    const student = await this.findOneStudent(id);
    await this.studentRepository.remove(student);
  }
}
