import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/models/studentform.model';
import { TutorialService } from 'src/app/services/tutorial.service';
declare var $: (arg0: any) => any;
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  student: Student[] = [];
  dataTable: any;
  dtOptions: any;
  @ViewChild('dataTable', { static: true })
  table!: { nativeElement: any };

  constructor( private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.getStudent();
  }
 	
  getStudent() {
    this.tutorialService.getStudentData().subscribe(
      (data) => {
       this.student = data;
        this.dtOptions = {
          data: this.student,
         columns: [
            { title: 'Student Name', data: 'name' },
            { title: 'Student Adress', data: 'adress' },
            { title: 'Student Email', data: 'Email' },
            { title: 'Student Discription', data: 'discription' },
          ],
       };
      },
      (err) => {},
      () => {
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable(this.dtOptions);
      }
    );
  }
}
