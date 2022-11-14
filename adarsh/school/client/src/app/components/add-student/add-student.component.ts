import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { SchoolService } from 'src/app/services/school.service';
import { File } from 'src/app/models/file';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  newStudent: Student = {
    name: '',
    address: '',
    email: '',
    gender: '',
    dateOfBirth:'',
    schools:{},
    files:{},
  };
  registerForm!: FormGroup;
  submitted?: boolean;
  genders: string[] = [];
  schools:School[]=[];
  addedSchools: School[] = [];
  selectedSchool: School = {};
  selectedFile? : File;
  progress?: number;
  selectedFiles?: File;
  currentFile?: File;
  currentSchool: School = new School;
 
  
  constructor( private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      schools:['',Validators.required],
    });
    
    this.retrieveSchool();
    this.retrieveGender();
    if(this.route.snapshot.params.id) {
      this.getStudentId(this.route.snapshot.params.id);
    }    
  }

  get validation() {
    return this.registerForm.controls;
  }
async retrieveSchool() {
  this.schools = await this.schoolService.getSchool();
}
async onSelectingSchool(school: School) {
  this.newStudent.schools = school;
 
}
 retrieveGender() {
  this.genders = this.schoolService.getGenderData();
}
async saveNewStudent(): Promise<void> {
  const students: Student = {
    name: this.newStudent.name,
    address: this.newStudent.address,
    email: this.newStudent.email,
    gender: this.newStudent.gender,
    phone:this.newStudent.phone,
    dateOfBirth:this.newStudent.dateOfBirth,
    schools:this.newStudent.schools,
    files:this.selectedFile,
    
  };
  await this.schoolService.createNewStudent(students);
  this.router.navigate(['/studentList']);
}
private async getStudentId(id: number) {
  this.newStudent = await this.schoolService.getStudentByID(id);
}
async updateStudent(): Promise<void> {
  const studentData = {
    id: this.newStudent.id,
    name: this.newStudent.name,
    address: this.newStudent.address,
    email: this.newStudent.email,
    dateOfBirth:this.newStudent.dateOfBirth,
    phone: this.newStudent.phone,
    schools:this.currentSchool,
  };
  await this.schoolService.updateStudent(this.newStudent.id!, studentData);
  this.router.navigate(['/teacherList']);
}
selectFile(event: any) {
  this.selectedFiles = event.target.files;
}
uploadNewFile(): void {
  this.progress = 0;
      this.selectedFile = this.selectedFiles && this.selectedFiles;
}

signup() {
  this.submitted = true;
  if (this.registerForm.invalid) {
    return;
  }
  alert('form fields are validated successfully!');
  this.saveNewStudent();
}
async onSelectedSchool(school: string) {
  const data = this.schools.filter((s) => s.id === +school);
  this.currentSchool = data[0];
}


}
