import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PanelService } from '../../services/panel.service';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  person: any;
  students: any;
  employee?: any;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private http: HttpClient, private panelservice: PanelService) {}

  ngOnInit(): void {
    this.getAllEmployess();
    this.getAllStudents();
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback, event: any) => {
        const data = that.panelservice.getEmployee();
        this.person = data.data;
        callback({});
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }],
    };
  }
  getAllStudents() {
    this.students = this.panelservice.getStudent();
    return this.students;
  }
  getAllEmployess() {
    this.employee = this.panelservice.getEmployee();
    console.log(this.employee);
    return this.employee;
  }
}
