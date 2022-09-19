import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { Test } from '../../models/test.model';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels?: Panel[];
  showForm: boolean;
  addPanelForm: boolean;
  submitted = false;
  showButton: boolean;
  tests: Test[];
  showDropdown: boolean;
  selectedTests: Test[] = [];
  selectedTest = new Test();
  savedReport = new Report();
  testTable: boolean;
  panel: Panel = {
    name: '',
    description: '',
    test: [],
  };
  test: Test = {
    name: '',
  };
  report: Report = {
    name: this.randomString(5),
  };

  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.listPanels();
    this.listTests();
    this.showForm = false;
  }

  randomString(length) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  async listPanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanel();
  }

  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }

  addPanel() {
    this.showForm = true;
  }

  canclePanel() {
    this.showForm = false;
    this.addPanelForm = false;
    this.showButton = false;
  }

  editTest(test: Test) {
    this.test = test;
    this.showDropdown = true;
  }

  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panelData);
    this.showForm = false;
    this.listPanels();
  }

  onSelected(value: Test) {
    if (this.tests) {
      for (const tests of this.tests) {
        if (tests.id === value.id) {
          this.selectedTests.push(tests);
        }
      }
    }
  }

  async updatePanel(): Promise<void> {
    const panelData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      test: this.panel.test,
    };
    panelData.test = this.selectedTests;
    await this.panelService.update(panelData);
    this.addPanelForm = false;
    this.showDropdown = false;
    this.testTable = true;
  }

  async saveReport() {
    const reportData: Report = {
      name: this.report.name,
    };
    this.savedReport = await this.panelService.createReport(reportData);
    if (this.savedReport && this.savedReport.id) {
      localStorage.setItem('reportId', this.savedReport.id + '');
    }
  }
}
