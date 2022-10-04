import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';
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
  report1: ReportTestPanel = {
    data: '',
    panel_fk: 0,
    test_fk: 0,
    report_fk: 0,
  };
  objectToMap = new Map();

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
  checkIfPanelContainsTest(currentPanel: Panel, currentTest: Test) {
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
  onBlurMethod(event: any, panel: Panel, test: Test) {
    const savedReportId = localStorage.getItem('reportId');
    if (savedReportId != null) {
      const ReportTestPanel: ReportTestPanel = {
        data: event.target.value,
        panel_fk: panel.id,
        test_fk: test.id,
        report_fk: +savedReportId,
      };
      console.log(ReportTestPanel);
    }
  }

  onDisplay(currentPanel: Panel, currentTest: Test) {
    if (currentPanel && currentTest) {
      const keyObject = this.objectToMap.get(
        currentPanel.id + '' + currentTest.id,
      );
      return keyObject;
    }
  }
}
