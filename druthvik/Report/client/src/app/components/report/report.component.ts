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
}
