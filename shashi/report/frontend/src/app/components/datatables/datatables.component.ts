import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.serveice';
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

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
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
}