import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { ReportPanelTest } from 'src/app/models/report-panel-test.model';
import { Report } from 'src/app/models/report.model';
import { Test } from 'src/app/models/test.model';
import { Report } from 'src/app/models/report.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
  }

  onBlurMethod(event: any, panel: Panel, test: Test) {
    const reportData: ReportPanelTest = {
      data: event.target.value,
      panelId: panel.id,
      testId: test.id,
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
  reports: Report[] = [];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrieveReports();
  }

  async retrieveReports(): Promise<void> {
    this.reports = await this.panelService.getReports();
  }
}
