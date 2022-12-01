import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { School } from '../../models/school.model';
import { Student } from '../../models/student.model';
import { SchoolService } from '../../services/school.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  registerForm!: FormGroup;
  submitted!: boolean;
  schools: School[] = [];
  genders: string[] = [];
  selectedSchool: School = {};
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  id?: number;
  addForm?: boolean;
  currentStudent: Student = {
    studentName: '',
    gender: '',
    address: '',
    email: '',
    school: {},
  };

  constructor(
    private schoolService: SchoolService,
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      genders: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phoneNo: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.getSchools();
    this.getGenders();
    this.getStudentById(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    this.addForm = !this.id;
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    this.saveStudent();
  }

  async getSchools(): Promise<void> {
    this.schools = await this.schoolService.getSchools();
  }

  async getGenders() {
    this.genders = await this.studentService.getGender();
  }

  onSelected(school: string) {
    const schoolData = this.schools.filter((s) => s.schoolId === +school);
    this.selectedSchool = schoolData[0];
  }

  async getStudentById(id: number): Promise<void> {
    this.currentStudent = await this.studentService.getStudentById(id);
  }

  async saveStudent(): Promise<void> {
    const student: Student = {
      studentName: this.currentStudent.studentName,
      gender: this.currentStudent.gender,
      dateOfBirth: this.currentStudent.dateOfBirth,
      address: this.currentStudent.address,
      email: this.currentStudent.email,
      phoneNo: this.currentStudent.phoneNo,
      school: this.currentStudent.school,
    };
    await this.studentService.createStudent(student);
    this.router.navigate(['/student-list']);
  }

  async updateStudent(): Promise<void> {
    const student: Student = {
      studentId: this.currentStudent.studentId,
      studentName: this.currentStudent.studentName,
      gender: this.currentStudent.gender,
      dateOfBirth: this.currentStudent.dateOfBirth,
      address: this.currentStudent.address,
      email: this.currentStudent.email,
      phoneNo: this.currentStudent.phoneNo,
      school: this.currentStudent.school,
    };
    await this.studentService.updateStudent(
      this.currentStudent.studentId!,
      student
    );
    this.router.navigate(['/student-list']);
  }

  selectFile(event: Event): void {
    this.selectedFiles = (event.target as HTMLInputElement).files!;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fileUploadService.upload(this.currentFile);
      }
      this.selectedFiles = undefined;
    }
  }
}
