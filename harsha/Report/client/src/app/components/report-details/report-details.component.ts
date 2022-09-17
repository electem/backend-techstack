import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Panel } from 'src/app/models/panel.model';
import { ReportPanelTest } from 'src/app/models/report-panel-test.model';
import { Report } from 'src/app/models/report.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
})
export class ReportDetailsComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  reports: Report[] = [];
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  currentReport: Report = {
    name: '',
  };

  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
    this.getReportById(this.route.snapshot.params.id);
  }

  onBlurMethod(event: any, panel: Panel, test: Test) {
    const reportData: ReportPanelTest = {
      data: event.target.value,
      panelId: panel.id,
      testId: test.id,
      reportId: this.currentReport.id,
    };
    console.log(reportData);
  }

  isTestPresentInPanel(currentPanel: Panel, currentTest: Test) {
    if (
      currentPanel &&
      currentTest &&
      currentPanel.tests &&
      currentPanel.tests.find((test) => test.id === currentTest.id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }

  async getTests(): Promise<void> {
    this.tests = await this.panelService.getTests();
  }

  async getReportById(id: Number) {
    this.currentReport = await this.panelService.getReportById(id);
  }
}
