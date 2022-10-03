import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel.serveice';
import { Student } from '../../models/student';

class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css'],
})
export class DatatablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  students: Student[] = [];
  dtTrigger: any;
  constructor(private panelService: PanelService) {}
  ngOnInit(): void {
    // this.getAllStudent();
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      paging: true,
      lengthChange: true,
      serverSide: true,
      processing: true,
      lengthMenu: [
        [1, 12],
        [1, 12],
      ],
      ajax: (dataTablesParameters: any, callback) => {
        const jsonData = that.panelService.getAllStudent(
          dataTablesParameters.length,
          dataTablesParameters.start
        );
        // console.log(jsonData);
        that.students = jsonData;
        callback({});
      },
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'fees' },
        { data: 'class' },
      ],
    };
  }

  // getAllStudent() {
  //   //this.students = this.panelService.getAllStudent();
  //   console.log(this.students);
}
