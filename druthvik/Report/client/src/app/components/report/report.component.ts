import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  panels?: Panel[];
  tests: Test[];

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
}
