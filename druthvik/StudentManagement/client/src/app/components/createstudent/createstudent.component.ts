import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/models/school.model';
import { Gender, TeacherService } from 'src/app/services/teacher.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css'],
})
export class CreatestudentComponent implements OnInit {
  createtStudentForm: FormGroup;
  submitted = false;
  createstudent: Student = {
    name: '',
    address: '',
    phonenumber: null,
    email: '',
    gender: '',
    school: new School(),
  };
  schools: School[];
  genders: string[];
  date = new Date();
  currentSchool = new School();
  selectedGender: string;
  file: File;
  editFile = true;
  removeUpload = false;
  downloadfile: any;
  id: number;
  addForm: boolean;
  constructor(
    private studentservice: StudentService,
    private formBuilder: FormBuilder,
    private schoolservice: SchoolService,
    private teacherservice: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fileService: FileService,
  ) {}
  @ViewChild('fileInput') el: ElementRef | undefined;
  ngOnInit(): void {
    this.createtStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      school: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      file: ['', Validators.required],
    });

    this.retrieveSchools();
    this.getGenders();
    if (this.route.snapshot.params.id) {
      this.getStudentById(this.route.snapshot.params.id);
    }
    this.id = this.route.snapshot.params.id;
    this.addForm = !this.id;
  }
  get f() {
    return this.createtStudentForm.controls;
  }
  async createStudentValidate(): Promise<void> {
    this.submitted = true;
    if (this.createtStudentForm.invalid) {
      return;
    } else {
      this.createStudent();
    }
  }
  async createStudent(): Promise<void> {
    const createStudents: Student = {
      name: this.createstudent.name,
      address: this.createstudent.address,
      phonenumber: this.createstudent.phonenumber,
      email: this.createstudent.email,
      gender: this.createstudent.gender,
      dateofbirth: this.createstudent.dateofbirth,
      school: this.createstudent.school,
      file: this.createstudent.file,
    };
    await this.studentservice.createStudent(createStudents);
    this.router.navigate(['/liststudents']);
  }

  async retrieveSchools(): Promise<void> {
    this.schools = await this.schoolservice.getSchools();
  }
  getGenders() {
    this.genders = this.teacherservice.getGenders();
  }

  getSelectedGenderChange(gender: Gender) {
    this.selectedGender = gender.name;
  }

  async getStudentById(id: number) {
    this.createstudent = await this.studentservice.getStudentById(id);
  }

  async updateStudent(): Promise<void> {
    const student: Student = {
      studentid: this.createstudent.studentid,
      name: this.createstudent.name,
      address: this.createstudent.address,
      phonenumber: this.createstudent.phonenumber,
      email: this.createstudent.email,
      gender: this.selectedGender,
      dateofbirth: this.createstudent.dateofbirth,
      school: this.createstudent.school,
      file: this.createstudent.file,
    };
    await this.studentservice.updateStudent(student);
    this.router.navigate(['/liststudents']);
  }
  async uploadImage(): Promise<void> {
    this.fileService.uploadFile(this.file);
  }
  chooseFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.file = file;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.createtStudentForm.patchValue({
          file: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }
  async onSelectedSchool(school: string) {
    console.log(school);
    const data = this.schools.filter((s) => s.schoolid === +school);
    this.currentSchool = data[0];
  }
  async downloadFile() {
    this.downloadfile = await this.fileService
      .downloadFile(this.file)
      .subscribe((response) => {
        const filename = response.headers
          .get('content-disposition')
          ?.split(';')[1]
          .split('=')[1];
        const blob: Blob = response.body as Blob;
        const a = document.createElement('a');
        a.download = filename!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
  }
}
