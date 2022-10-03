import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
import { HttpClient, HttpResponse } from '@angular/common/http';


class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})

export class DataTablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons?: Person[];
  dtTrigger: Subject<any> = new Subject<any>();
  person?: Person[];

  constructor(private http: HttpClient,private PannelserviceService: PannelserviceService) { }

  ngOnInit(): void {
   this.dtOptions = {
   pagingType: 'full_numbers',
    pageLength: 2,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      this.person = this.PannelserviceService.getdatatable(dataTablesParameters.start,dataTablesParameters.length);
      // console.log(this.person);
    callback({
      
        
      });
   },
    columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
  };  
}

}
