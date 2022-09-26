import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report.model';
import { PanelService } from 'src/app/services/panel.serveice';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  reports?: Report[];
  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrieveReports();
  }

  async retrieveReports(): Promise<void> {
    this.reports = await this.panelService.getAllReport();
  }
}
