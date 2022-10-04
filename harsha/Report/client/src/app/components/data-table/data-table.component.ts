import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel.service';
import { Employee } from 'src/app/models/employee.model';

class DataTablesResponse {
  data!: any[];
  draw!: number;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  employees: Employee[] = [];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 3,
      serverSide: true,
      processing: true,
      ajax: async (dataTablesParameters: any, callback) => {
        console.log('DataTableData ' + JSON.stringify(dataTablesParameters));
        this.employees = await this.panelService.getEmployees(
          dataTablesParameters.draw - 1,
          dataTablesParameters.length
        );
        callback({});
      },
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'age' }],
    };
  }
}
