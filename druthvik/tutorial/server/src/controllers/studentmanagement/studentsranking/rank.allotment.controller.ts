//import { request } from 'http';
import { Route, Tags } from 'tsoa';
import { SudentRepository } from './student.repository';
import { Inject } from 'typescript-ioc';

@Route('students')
@Tags('Student')
export class RankAllotmentController {
  @Inject
  private sudentRepository!: SudentRepository;

  async getAllStudents() {
    return await this.sudentRepository.getAllSTudents();
  }

  async getCalculatedAverge() {
    return await this.sudentRepository.calcStudentAverage();
  }
}
