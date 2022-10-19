import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel.model';
import { Reportpaneltest } from '../../models/reportpaneltest.model';
import { Test } from '../../models/test.model';
import { PanelService } from '../../services/panel.serveice';

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
    this.objectToMap = new Map(Object.entries(reportMapData));
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanels();
  }

  async retrieveTests(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }

  async TestPresentInPanelTextBox(
    currentPanel: Panel,
    currentTest: Test
  ): Promise<boolean> {
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

  async dataInsertInTextBox(
    currentPanel: Panel,
    currentTest: Test
  ): Promise<void> {
    if (currentPanel && currentTest) {
      const mapedData = this.objectToMap.get(
        currentPanel.id + '_' + currentTest.id
      );
      return mapedData;
    }
  }
  
  async reportDetailsSave(event: any, 
    panel: Panel, 
    test: Test
    ): Promise<void> {
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