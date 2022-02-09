import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { StudentService } from '@app/services/student.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement{
  id: number;
  name: string;
  courseName: string;
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.less']
})
export class StudentListComponent implements OnInit {
  studentData = [];
  constructor(private studentService: StudentService) {
    this.fetchStudents();
   }
   @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'courseName', 'Action'];
  // dataSource = new MatTableDataSource<PeriodicElement>();
  dataSource = this.studentData;
  ngOnInit(): void {
  }
  // fetch student all
  fetchStudents(): any {
    this.studentService.getAllStudent().subscribe((data) => {
      console.log(data);
      this.dataSource = data;
      this.studentData = data;
       });
    this.fetchStudent();
  }
   // fetch details students student name course name
   fetchStudent(): void{
      // tslint:disable-next-line:no-shadowed-variable
      const students = this.studentData.map(students => `{"id":${students.studentId},"studentName":"${students.studentName}","courseName":"${students.course.courceName}"}`);
      const studentDetails = new Array();
      // tslint:disable-next-line:typedef
      students.forEach(function(student) {
        this.studentDetails.push(JSON.parse(student));
         });
      console.log(studentDetails);
   }

   // delete row
   deleteRow(id: number): any{
    const studentId = this.studentData.findIndex(data => data.studentId === id);
    this.studentData.splice( studentId , 1);
    this.dataSource = this.studentData;
    this.table.renderRows();
   }
}
