import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { Test } from 'src/app/models/test.model';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  selectedTests: Test[] = [];
  selectedTestNew = new Test();
  selectedTest = new Test();
  editForm: boolean = false;
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  report: Report = {
    name: '',
  };
  panelForm?: boolean;
  testForm?: boolean;
  currentIndex = -1;
  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
  }

  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  setActiveTutorial(tutorial: Panel, index: number): void {
    this.currentPanel = tutorial;
    this.currentIndex = index;
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }

  async getTests(): Promise<void> {
    this.tests = await this.panelService.getTests();
  }

  onSelected(value: Panel) {
    if (this.tests) {
      for (let test of this.tests) {
        if (test.id == value.id) {
          this.selectedTests.push(test);
        }
      }
    }
  }

  addPanel() {
    this.panelForm = true;
  }

  addTest() {
    this.testForm = true;
  }

  editPanel(panel: Panel) {
    this.currentPanel = panel;
    this.editForm = true;
  }

  async savePanel(): Promise<void> {
    const panelData: Panel = {
      name: this.currentPanel.name,
      description: this.currentPanel.description,
    };
    await this.panelService.createPanel(panelData);
  }

  async saveReport(): Promise<void> {
    const report: Report = {
      name: this.randomString(9),
    };
    await this.panelService.createReport(report);
  }

  async updatePanel(): Promise<void> {
    const panel = {
      id: this.currentPanel.id,
      name: this.currentPanel.name,
      description: this.currentPanel.description,
      tests: this.currentPanel.tests,
    };
    panel.tests = this.selectedTests;
    await this.panelService.updatePanel(this.currentPanel.id, panel);
  }

  cancelPanel() {
    this.panelForm = false;
  }
}
