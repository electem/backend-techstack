import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Panel } from 'src/app/models/pannel';
import { Test } from 'src/app/models/test';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
import { Report } from 'src/app/models/report';
import { Reporttestpanel } from 'src/app/models/reporttestpanel';

@Component({
  selector: 'app-reporttable',
  templateUrl: './reporttable.component.html',
  styleUrls: ['./reporttable.component.css'],
})
export class ReporttableComponent implements OnInit {
  panels?: Panel[];
  tests?: Test[];
  submitted = false;

  reporttestpanels: Reporttestpanel = {
    panel_id: 1,
    data: '',
    test_id: 1,
  };

  report: Report = {
    name: '',
  };
  reportMap = new Map();

  constructor(
    private PannelserviceService: PannelserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrieveTest();
    this.retrievePanels();
    this.retrieveReportPanelTestRecord();
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.PannelserviceService.getAll();
  }
  async retrieveTest(): Promise<void> {
    this.tests = await this.PannelserviceService.getAllTest();
  }

  isTestPresentInAPanel(currentPanel: Panel, currentTest: Test) {
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
  onBlurMethod(event: any, panel: Panel, test: Test) {
    const reportpanel: Reporttestpanel = {
      panel_id: panel.id,
      test_id: test.id,
      data: event.target.value,
    };

    console.log(reportpanel);
  }
  async savetabledata() {
    this.submitted = true;
    const reporttestpanel: Reporttestpanel = {
      panel_id: this.reporttestpanels.panel_id,
      data: this.reporttestpanels.data,
      test_id: this.reporttestpanels.test_id,
    };
  }
  async retrieveReportPanelTestRecord(): Promise<void> {
    const mapdata = await this.PannelserviceService.getAllReportTestPanel();
    this.reportMap = new Map(Object.entries(mapdata));
  }

  onReportPanelTest(currentPanel: Panel, currentTest: Test) {
    if (currentPanel && currentTest) {
      const paneltest = this.reportMap.get(
        currentPanel.id + '_' + currentTest.id
      );
      return paneltest;
    }
  }
}
