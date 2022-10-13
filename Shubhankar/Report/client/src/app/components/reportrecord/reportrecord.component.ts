import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report';
import { PannelService } from '../../services/pannelservice.service';

@Component({
  selector: 'app-reportrecord',
  templateUrl: './reportrecord.component.html',
  styleUrls: ['./reportrecord.component.css'],
})
export class ReportrecordComponent implements OnInit {
  
  currentReport: Report = {};
  records?: Report[];

  constructor(private pannelservice: PannelService) {}

  ngOnInit(): void {
    this.retrieveRecords();
  }

  async retrieveRecords(): Promise<void> {
    this.records = await this.pannelservice.getRecords();
  }
}
