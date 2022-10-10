import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class DatatablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  employee?: Employee[] = [];

  constructor(private panelService: PanelService) {}
  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const employeeData = that.panelService.getEmployee(
          dataTablesParameters.length,
          dataTablesParameters.start,
        );
        that.employee = employeeData;
        callback({});
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }],
    };
  }
}
