import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
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
}
