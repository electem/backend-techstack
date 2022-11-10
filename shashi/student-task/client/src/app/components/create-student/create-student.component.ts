import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { School } from 'src/app/models/school.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/student-task-service';
import { Teacher } from 'src/app/models/teacher.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';
import { Gender } from 'src/app/services/student-task-service';
import { DatepickerOptions } from 'ng2-datepicker';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  createStudentForm!: FormGroup;
  date = new Date();
  options: DatepickerOptions = {
    format: 'DD-MM-YYYY',
    placeholder: 'select date',
  };
  student: Student = {
    studentname: '',
    address: '',
    email: '',
    phonenumber: null,
    dob: new Date(),
    school: new School(),
  };
  currentSchool = new School();
  schoolsList: School[] = [];
  gendersList?: Gender[];
  currentGender!: Gender;
  selectedGender!: string;
  model = { option: 'option3' };

  submitted = false;
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private router: Router,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}
  registrationForm = this.fb.group({
    file: [null],
  });
  @ViewChild('fileInput') el: ElementRef | undefined;
  editFile = true;
  removeUpload = false;
  downloadFileName!: string;
  file!: File;

  ngOnInit(): void {
    this.createStudentForm = this.formBuilder.group({
      studentname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],
      dob: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.retrieveschools();
    this.retieveGenders();
  }
  async uploadImage(): Promise<void> {
    this.schoolService.uploadFile(this.file);
  }
  chooseFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.file = file;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registrationForm.patchValue({
          file: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }

  retieveGenders() {
    this.gendersList = this.schoolService.genderList;
  }
  get f() {
    return this.createStudentForm.controls;
  }
  async retrieveschools(): Promise<void> {
    this.schoolsList = await this.schoolService.getSchools();
  }

  async checkValidation(): Promise<void> {
    this.submitted = true;
    if (this.createStudentForm.invalid) {
      return;
    } else {
      this.saveStudentDetails();
    }
  }
  async saveStudentDetails(): Promise<void> {
    const StudentData: Student = {
      studentname: this.student.studentname,
      address: this.student.address,
      email: this.student.email,
      phonenumber: this.student.phonenumber,
      dob: this.student.dob,
      gender: this.selectedGender,
      school: this.currentSchool,
    };
    await this.schoolService.createStudent(StudentData);
    this.router.navigate(['/studentslist']);
  }
  getSelectedStudentGender(gender: Gender) {
    this.selectedGender = gender.name;
  }
  async selectedSchool(school: School) {
    this.currentSchool = school;
  }
}
