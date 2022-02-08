import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {StudentService} from 'src/app/services/student.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.less']
})
export class SemesterComponent implements OnInit {
   semesterList = [];
   subjectList = [];
   semFk = null;
   course = [];
   condition = true;
   form: FormGroup;
   studentDetails: '';
  // multi drop down
  subList = [];
  selectedSubjects = [];
  dropdownSettings: IDropdownSettings;
  constructor( private formBuilder: FormBuilder,
               private studentService: StudentService,
               private route: ActivatedRoute,
               private router: Router) {
      this.semesterName();
      this.getSubjects();
  }
  ngOnInit(): void {
  }

   // fetch semister
   semesterName(): void {
    this.studentService.getSemester().subscribe((data) => {
      console.log(data);
      this.semesterList = data;
       });
  }
  // multi drop down
           getSubjects(): void {
            this.studentService.getCourceById().subscribe((data) => {
              console.log(data);
              this.subjectList = data.subjectList;
               });
           // this.subjectList = this.course.subjectList;
            this.dropdownSettings = {
              singleSelection: false,
              idField: 'subjectId',
              textField: 'subjecName',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 3,
              allowSearchFilter: true
            };
           }

        onItemSelect(subject: any): void {
          console.log(this.selectedSubjects);
          }
          onSelectAll(subject: any): void {
           // this.selectedSubjects = this.selectedSubjects.filter(item => item !== item);
            console.log(this.selectedSubjects);
          }
          // fetch Semester List.
          getSemList(): void {
            // this.semesterList = this.subjectList.map(Data => Data.semester);
          }

}
