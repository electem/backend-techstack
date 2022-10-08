import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel.model';
import { PanelService } from '../../services/panel.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-reporttable',
  templateUrl: './reporttable.component.html',
  styleUrls: ['./reporttable.component.css'],
})
export class ReporttableComponent implements OnInit {
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
}
