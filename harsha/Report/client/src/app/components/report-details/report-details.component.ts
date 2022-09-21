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
  reportPanelTests: ReportPanelTest[] = [];
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  report: Report = {
    name: '',
  };
  savedreportId: any;
   maps = new Map()


  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
    this.getReportPanelTests();
  }

  getData(currentPanel: Panel, currentTest: Test) {
    if (currentPanel && currentTest && this.reportPanelTests) {
      const matchingData = this.reportPanelTests.find(
        (repot) =>
          repot.testId === currentTest.id && repot.panelId === currentPanel.id
      );
      return matchingData && matchingData.data;
    } else {
      return '';
    }
  }

  async onBlurMethod(event: any, panel: Panel, test: Test) {
    const savedreportId = localStorage.getItem('reportId');
    if (savedreportId != null) {
      const reportData: ReportPanelTest = {
        data: event.target.value,
        panelId: panel.id,
        testId: test.id,
        reportId: +savedreportId,
      };
      console.log(reportData);
      await this.panelService.createReportPanelTests(reportData);
    }
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

  async getReportPanelTests(): Promise<void> {
    const reportPanelTest = await this.panelService.getReportPanelTests();
    const mapObject = new Map(Object.entries(reportPanelTest));
    this.maps = mapObject;
  }

  async getReportById(id: Number) {
    this.report = await this.panelService.getReportById(id);
  }
}
