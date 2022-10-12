import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel.model';
import { Test } from '../../models/test.model';
import { PanelService } from '../../services/panel.service';
import { ReportTestPanel } from '../../models/reporttestpanel.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  panels?: Panel[];
  tests: Test[];
  report: ReportTestPanel[];
  objectToMap = new Map();
  reportPanelTests: ReportTestPanel[] = [];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listPanels();
    this.listTests();
    this.listReportTestPanel();
  }

  async listPanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanel();
  }

  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }

  async listReportTestPanel(): Promise<void> {
    const reportMap = await this.panelService.getReportPaneltest();
    this.objectToMap = new Map(Object.entries(reportMap));
  }

  async checkIfPanelContainsTest(currentPanel: Panel, currentTest: Test) {
    if (
      currentPanel &&
      currentTest &&
      currentPanel.test &&
      currentPanel.test.find((test) => test.id === currentTest.id)
    ) {
      return true;
    } else {
      return false;
    }
  }

  async onDisplay(currentPanel: Panel, currentTest: Test) {
    if (currentPanel && currentTest) {
      const keyObject = this.objectToMap.get(
        currentPanel.id + '' + currentTest.id,
      );
      return keyObject;
    }
  }

  async reportDetailsSave(event: any, panel: Panel, test: Test): Promise<void> {
    const savedReportId = localStorage.getItem('reportId');
    if (savedReportId != null) {
      const reportPanelTest: ReportTestPanel = {
        data: event.target.value,
        panel_fk: panel.id,
        test_fk: test.id,
        report_fk: +savedReportId,
      };
      console.log(reportPanelTest);
    }
  }
}
