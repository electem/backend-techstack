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
import { ActivatedRoute, Router } from '@angular/router';
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
    dob: new Date(),
    school: new School(),
  };
  optionSelected: any;
  currentSchool = new School();
  schoolsList: School[] = [];
  gendersList?: string[];
  currentGender!: Gender;
  selectedGender!: string;
  model = { option: 'option3' };
  submitted = false;
  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private router: Router,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}
  registrationForm = this.fb.group({
    file: [null],
  });
  @ViewChild('fileInput') el: ElementRef | undefined;
  editFile = true;
  removeUpload = false;
  downloadFileName!: string;
  file!: File;
  id: Image['id'];
  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.getStudentById(this.route.snapshot.params.id);
    }
    this.createStudentForm = this.formBuilder.group({
      studentname: ['', Validators.required],
      address: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3}))$/
          ),
        ]),
      ],
      phonenumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{3})$/),
        ]),
      ],
      dob: ['', Validators.required],
      school: [''],
      gender: ['', Validators.required],
    });
    this.retrieveschools();
    this.retieveGenders();
  }
  //async uploadImage(): Promise<void> {}
  chooseFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.file = file;
    console.log(this.file.name);
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
      gender: this.student.gender,
      school: this.currentSchool,
      //imageid?: Image?['id']
    };
    // await this.schoolService.uploadFile(this.file);
    // console.log(this.file)
    await this.schoolService.createStudent(StudentData);
    this.router.navigate(['/studentslist']);
  }
  getSelectedStudentGender(gender: Gender) {
    this.selectedGender = gender.name;
  }
  async selectedSchool(school: string) {
    console.log(school);
    const data = this.schoolsList.filter((s) => s.schoolid === +school);
    this.currentSchool = data[0];
  }
  async getStudentById(id: number): Promise<void> {
    this.student = await this.schoolService.getStudentById(id);
    this.optionSelected = this.student.school;
  }
  async updateStudent(): Promise<void> {
    const StudentData: Student = {
      studentid: this.student.studentid,
      studentname: this.student.studentname,
      address: this.student.address,
      email: this.student.email,
      dob: this.student.dob,
      gender: this.student.gender,
      school: this.currentSchool,
    };
    await this.schoolService.updateStudent(StudentData);
  }
}
