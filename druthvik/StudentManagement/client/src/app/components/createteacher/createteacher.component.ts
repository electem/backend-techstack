import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from 'src/app/models/teacher.model';
import { Gender, TeacherService } from 'src/app/services/teacher.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/models/school.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
@Component({
  selector: 'app-createteacher',
  templateUrl: './createteacher.component.html',
  styleUrls: ['./createteacher.component.css'],
})
export class CreateteacherComponent implements OnInit {
  createtTeacherForm: FormGroup;
  submitted = false;
  createteacher: Teacher = {
    name: '',
    address: '',
    phonenumber: null,
    email: '',
    gender: '',
    school: [],
  };
  schools: School[] = [];
  currentSchool = new School();
  AdddedSchoolList: School[] = [];
  genders: string[];
  selectedGender: string;
  file: File;
  editFile = true;
  removeUpload = false;
  id: number;
  addForm: boolean;
  boolean: boolean;
  selectedSchool = new School();
  currentSchools: School[] = [];
  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private schoolservice: SchoolService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fileService: FileService,
  ) {}
  @ViewChild('fileInput') el: ElementRef | undefined;
  ngOnInit(): void {
    this.createtTeacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      school: ['', Validators.required],
      school2: ['', Validators.required],
    });
    this.getGenders();
    this.retrieveSchools();
    if (this.route.snapshot.params.id) {
      this.getTeacherById(this.route.snapshot.params.id);
    }
    this.id = this.route.snapshot.params.id;
    this.addForm = !this.id;
    this.boolean = !this.id;
  }
  get f() {
    return this.createtTeacherForm.controls;
  }
  async createTeacherValidate(): Promise<void> {
    this.submitted = true;
    if (this.createtTeacherForm.invalid) {
      return;
    } else {
      this.createTeacher();
    }
  }
  async createTeacher(): Promise<void> {
    const createTeacher: Teacher = {
      name: this.createteacher.name,
      address: this.createteacher.address,
      phonenumber: this.createteacher.phonenumber,
      email: this.createteacher.email,
      gender: this.createteacher.gender,
      school: this.AdddedSchoolList,
    };
    await this.teacherService.createTeacher(createTeacher);
    this.router.navigate(['/listteachers']);
  }
  async retrieveSchools(): Promise<void> {
    this.schools = await this.schoolservice.getSchools();
  }
  async selectedSchools(school: School): Promise<void> {
    this.currentSchool = school;
    this.AdddedSchoolList?.push(this.currentSchool);
  }

  async onSelectedSchool(school: School) {
    console.log(school);
    const data = this.schools.filter((s) => s.schoolid === school.schoolid);
    this.AdddedSchoolList = data;
  }

  getGenders() {
    this.genders = this.teacherService.getGenders();
  }

  async getTeacherById(id: number) {
    this.createteacher = await this.teacherService.getTeacherById(id);
  }

  async updateTeacher(): Promise<void> {
    const teacher: Teacher = {
      teacherid: this.createteacher.teacherid,
      name: this.createteacher.name,
      address: this.createteacher.address,
      phonenumber: this.createteacher.phonenumber,
      email: this.createteacher.email,
      gender: this.createteacher.gender,
      school: this.AdddedSchoolList,
    };
    await this.teacherService.updateTeacher(teacher);
    this.router.navigate(['/listteachers']);
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
        this.createtTeacherForm.patchValue({
          file: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      this.cd.markForCheck();
    }
  }
}
