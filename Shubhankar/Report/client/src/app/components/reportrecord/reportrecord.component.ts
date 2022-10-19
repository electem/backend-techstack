import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report';
import { PannelserviceService } from 'src/app/services/pannelservice.service';

@Component({
  selector: 'app-reportrecord',
  templateUrl: './reportrecord.component.html',
  styleUrls: ['./reportrecord.component.css'],
})
export class ReportrecordComponent implements OnInit {
  currentReport: Report = {};
  records?: Report[];

  constructor(private PannelserviceService: PannelserviceService) {}

  ngOnInit(): void {
    this.retrieveRecords();
  }

  async retrieveRecords(): Promise<void> {
    this.records = await this.PannelserviceService.getRecords();
  }
}
