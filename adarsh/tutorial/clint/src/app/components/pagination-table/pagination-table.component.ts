import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TutorialService } from 'src/app/services/tutorial.service';
import { HttpClient } from '@angular/common/http';
import { Parson } from 'src/app/models/person.model';
import { Student } from 'src/app/models/student.model';
class DataTablesResponse {
  data: any[] = [];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}
@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.css']
})
export class PaginationTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  students: Student[] = [];
  persons?: Parson[];
  dtTrigger: Subject<any> = new Subject();
  data: any;
  constructor( private tutorialService: TutorialService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getStudent();
  }
   getStudent() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'https://xtlncifojk.eu07.qoddiapp.com/',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.persons = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };
  }
   
}

   



