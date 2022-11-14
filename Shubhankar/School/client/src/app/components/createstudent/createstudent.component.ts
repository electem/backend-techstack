import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image';
import { School } from 'src/app/models/school';

import { Student } from 'src/app/models/student';
import { Gender, SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css'],
})
export class CreatestudentComponent implements OnInit {
  id?: number;
  isAddMode?: boolean;
  createStudent!: FormGroup;
  submitted: boolean = false;
  currentGender!: string;
  genderlist: Gender[] = [];
  selectedGender!: any;

  selectedFiles?: Image;
  currentFile?: File;

  student: Student = {
    studentname: '',
    address: '',
    phonenumber: '',
    email: '',
    gender: '',
    dateofbirth: '',
    school: {},
  };

  schoolsList: School[] = [];
  currentSchool: School = {};

  schools: School[] = [];
  fileName = '';

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  @ViewChild('fileInput') el: ElementRef | undefined;
  editFile = true;
  removeUpload = false;
  downloadFileName!: string;
  file!: File;
  progress?: number;

  ngOnInit(): void {
    this.createStudent = this.formBuilder.group({
      studentname: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      school: ['', Validators.required],
    });
    this.retriveGenders();
    this.retrieveSchool();
    this.retrieveStudentId(this.route.snapshot.params.id);

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }

  async retrieveSchool(): Promise<void> {
    this.schoolsList = await this.schoolService.getallSchoolRecords();
    console.log(this.schools);
  }

  async retriveGenders(): Promise<void> {
    this.genderlist = await this.schoolService.genderList();
    console.log(this.genderlist);
  }

  get fval() {
    return this.createStudent.controls;
  }

  async create() {
    this.submitted = true;
    if (this.createStudent.invalid) {
      return;
    }
    this.getSubmit();
  }

  async getSubmit() {
    this.submitted = true;
    const studentinfo: Student = {
      studentname: this.student.studentname,
      address: this.student.address,
      phonenumber: this.student.phonenumber,
      email: this.student.email,
      gender: this.student.gender,
      file: this.selectedFiles,
      dateofbirth: this.student.dateofbirth,
      school: this.currentSchool,
    };
    await this.schoolService.createStudent(studentinfo);
    this.router.navigate(['student-list']);
  }

  getStudentGender(gender: Gender) {
    this.currentGender = gender.name;
  }

  private selectedLink: string = 'Male';

  setradio(e: string): void {
    this.selectedLink = e;
  }

  isSelected(name: string): boolean {
    if (!this.selectedLink) {
      return false;
    }

    return this.selectedLink === name;
  }

  onSelected(value: School) {
    this.student.school = value;
  }

  getBack() {
    this.router.navigate(['student-list']);
  }

  async retrieveStudentId(id: number): Promise<void> {
    this.student = await this.schoolService.getStudentbyid(id);
  }

  async update() {
    this.submitted = true;
    if (this.createStudent.invalid) {
      return;
    }
    this.getUpdated();
  }

  async getUpdated() {
    this.submitted = true;
    const studentinfo: Student = {
      studentid: this.student.studentid,
      studentname: this.student.studentname,
      address: this.student.address,
      phonenumber: this.student.phonenumber,
      email: this.student.email,
      gender: this.student.gender,
      file: this.selectedFiles,
      dateofbirth: this.student.dateofbirth,
      school: this.student.school,
    };
    await this.schoolService.updateStudent(studentinfo);
    this.router.navigate(['student-list']);
  }

  async uploadImage(): Promise<void> {
    this.schoolService.uploadFile(this.file);
  }

  chooseFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.file = file;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadNewFile(): void {
    this.progress = 0;
    this.selectedFiles = this.selectedFiles && this.selectedFiles;
  }

  async selectedSchool(school: string) {
    console.log(school);
    const data = this.schoolsList.filter((s) => s.schoolid === +school);
    this.currentSchool = data[0];
  }
}
