import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';
import { ReportTestPanel } from '../../models/reporttestpanel.model';
import { Report } from '../../models/report.model';

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
    panelFk: 0,
    testFK: 0,
  };

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listPanels();
    this.listTests();
  }
  async listPanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanel();
  }
  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
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
    const ReportTestPanel: ReportTestPanel = {
      data: event.target.value,
      panelFk: panel.id,
      testFK: test.id,
    };
    console.log(ReportTestPanel);
    console.log(event.target.value);
    console.log(panel.id);
    console.log(test.id);
  }
}
