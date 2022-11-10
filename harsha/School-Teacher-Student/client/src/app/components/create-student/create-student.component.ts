import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  submitted: boolean = false;
  schools: School[] = [];
  genders: string[] = [];
  selectedSchool: School = {};
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  currentStudent: Student = {
    name: '',
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
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      genders: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.getSchools();
    this.getGenders();
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

  onSelected(value: School) {
    this.currentStudent.school = value;
  }

  async saveStudent(): Promise<void> {
    const student: Student = {
      name: this.currentStudent.name,
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
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

  public downloadFile(): void {
    this.fileUploadService.getFiles(this.currentFile!).subscribe((response) => {
      let fileName = response.headers
        .get('Content-Disposition')
        ?.split(';')[1]
        .split('=')[1];
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName!;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
