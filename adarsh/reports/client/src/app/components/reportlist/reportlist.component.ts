import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panel } from 'src/app/models/panel.model';
import { ReportPanelTest } from 'src/app/models/reportlist.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css'],
})
export class ReportlistComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  reportlist: ReportPanelTest = {
    id: 0,
    data: '',
    reportID: 0,
    panelID: 0,
    testID: 0,
  };
  reportTestPanelList: ReportPanelTest[] = [];
  reportList: ReportPanelTest[] = [];
  stringJson?: string;
  reportMapDetails = new Map();
  savedreportId: any;
  constructor(
    private panelService: PanelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.retrieveTest();
    this.retrieveReportList();
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }
  async retrieveTest(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }
  async retrieveReportList(): Promise<void> {
    const reportMap = await this.panelService.getAllReportList();
    this.reportMapDetails = new Map(Object.entries(reportMap));
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
  isPanelTestPresentInReport(currentPanel: Panel, currentTest: Test) {
    if (currentPanel && currentTest) {
      const reportMapvalue = this.reportMapDetails.get(currentPanel.id + '_' + currentTest.id);
      return reportMapvalue;
    }
  }

  async onBlurEvent(event: any, panel: Panel, test: Test) {
    const savedreportId = localStorage.getItem('reportId');
    if (savedreportId != null) {
      const reportList: ReportPanelTest = {
        data: event.target.value,
        panelID: panel.id,
        testID: test.id,
        reportID: +this.savedreportId,
      };
    }
  }
}
