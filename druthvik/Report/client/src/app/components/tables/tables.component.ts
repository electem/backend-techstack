import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Employee } from '../../models/employee.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class DatatablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  employee?: Employee[] = [];
  student?: Student[] = [];

  constructor(private panelService: PanelService) {}
  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      paging: true,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const jsonData = that.panelService.getEmployee(
          dataTablesParameters.start,
          dataTablesParameters.length,
        );
        that.employee = jsonData;
        console.log(jsonData);
        callback({});
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }],
    };
  }
  getAllEmployess() {
    this.employee = this.panelService.getEmployees();
    console.log(this.employee);
  }
}
