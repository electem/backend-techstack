import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { Reportpaneltest } from 'src/app/models/reportpaneltest.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.serveice';

@Component({
  selector: 'app-panel-test-details',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  panels?: Panel[];
  tests?: Test[];
  reportpaneltest?: Reportpaneltest[];
  currentPanel?: Panel;
  disableTextbox?: boolean;
  objectToMap = new Map();
  selectedTests: Test[] = [];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  reportPanelTest: Reportpaneltest = {
    data: '',
  };

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.retrieveTests();
    this.retrieveReportpaneltest();
  }

  async retrieveReportpaneltest(): Promise<void> {
    const reportMapData = await this.panelService.getAllReportpaneltest();
    console.log(reportMapData);
    // converting map to object
    this.objectToMap = new Map(Object.entries(reportMapData));
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanels();
  }
  async retrieveTests(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }
  TestPresentInPanelTextBox(currentPanel: Panel, currentTest: Test): boolean {
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

  dataInsertInTextBox(currentPanel: Panel, currentTest: Test): void {
    if (currentPanel && currentTest) {
      const mapedData = this.objectToMap.get(
        currentPanel.id + '_' + currentTest.id
      );
      return mapedData;
    }
  }

  // without mapping
  // dataInsertInTextBox(currentPanel: Panel, currentTest: Test) {
  //   if (currentPanel && currentTest && this.reportpaneltest) {
  //     const tableData = this.reportpaneltest.find(
  //       (reportpanel) =>
  //         reportpanel.panel_fk == currentPanel.id &&
  //         reportpanel.test_fk == currentTest.id
  //     );
  //     return tableData?.data;
  //   } else {
  //     return 'shashi ';
  //   }
  // }

  reportDetailsSave(event: any, panel: Panel, test: Test): void {
    const savedReportId = localStorage.getItem('reportId');
    if (savedReportId != null) {
      const reportPanelTest: Reportpaneltest = {
        data: event.target.value,
        panelFk: panel.id,
        testFk: test.id,
        reportFk: +savedReportId,
      };
      console.log(reportPanelTest);
    }
  }
}
