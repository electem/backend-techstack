import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Person } from '../../models/person';
import { PannelService } from '../../services/pannelservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css'],
})
export class DataTablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons?: Person[];
  dtTrigger: Subject<any> = new Subject<any>();
  person?: Person[];

  constructor(private http: HttpClient, private pannelService: PannelService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.person = this.pannelService.getdatatable(
          dataTablesParameters.start,
          dataTablesParameters.length
        );
        callback({});
      },
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }],
    };
  }
}
