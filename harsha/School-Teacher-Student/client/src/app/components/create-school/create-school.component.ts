import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { School } from 'src/app/models/school.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css'],
})
export class CreateSchoolComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;
  teachers: Teacher[] = [];
  addedTeachers: Teacher[] = [];
  selectedTeacher?: Teacher = {};
  students: Student[] = [];
  addedStudents: Student[] = [];
  selectedStudent?: Student = {};
  dropdownSettingsForTeacher: IDropdownSettings = {};
  dropdownSettings: IDropdownSettings = {};
  id?: number;
  addForm?: boolean;
  currentSchool: School = {
    schoolName: '',
    address: '',
    teachers: [],
    students: [],
  };
  constructor(
    private schoolService: SchoolService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      schoolName: ['', Validators.required],
      address: ['', Validators.required],
      teachers: ['', Validators.required],
      students: ['', Validators.required],
    });
    this.getTeachers();
    this.getStudents();
    this.getSchoolById(this.route.snapshot.params.id);
    this.dropdownSettingsForTeacher = {
      idField: 'teacherId',
      textField: 'teacherName',
    };
    this.dropdownSettings = {
      idField: 'studentId',
      textField: 'studentName',
    };
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
    this.saveSchool();
  }

  async getTeachers(): Promise<void> {
    this.teachers = await this.teacherService.getTeachers();
  }

  async getStudents(): Promise<void> {
    this.students = await this.studentService.getStudents();
  }

  async getSchoolById(id: number) {
    this.currentSchool = await this.schoolService.getSchoolById(id);
  }

  async onSelectingTeacher(teacher: any): Promise<void> {
    this.selectedTeacher = teacher;
    this.addedTeachers.push(this.selectedTeacher!);
  }

  onSelectAllTeachers(teachers: any) {
    this.selectedTeacher = teachers;
    this.addedTeachers.push(this.selectedTeacher!);
  }

  async onSelectingStudent(student: any): Promise<void> {
    this.selectedStudent = student;
    this.addedStudents.push(this.selectedStudent!);
  }

  onSelectAllStudents(students: any) {
    this.selectedStudent = students;
    this.addedStudents?.push(this.selectedStudent!);
  }

  async saveSchool(): Promise<void> {
    const school: School = {
      schoolName: this.currentSchool.schoolName,
      address: this.currentSchool.address,
      teachers: this.addedTeachers,
      students: this.addedStudents,
    };
    await this.schoolService.createSchool(school);
    this.router.navigate(['/school-list']);
  }

  async updateSchool(): Promise<void> {
    const school: School = {
      schoolId: this.currentSchool.schoolId,
      schoolName: this.currentSchool.schoolName,
      address: this.currentSchool.address,
      teachers: this.addedTeachers,
      students: this.addedStudents,
    };
    await this.schoolService.updateSchool(this.currentSchool.schoolId!, school);
    this.router.navigate(['/school-list']);
  }
}
