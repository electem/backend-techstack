import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '../../models/report.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-report-detial-list',
  templateUrl: './report-detial-list.component.html',
  styleUrls: ['./report-detial-list.component.css'],
})

export class ReportDetialListComponent implements OnInit {
  reports: Report[] = [];
  
  constructor(
    private panelService: PanelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveReportrs();
  }

  async retrieveReportrs(): Promise<void> {
    this.reports = await this.panelService.getAllReport();
  }
}
