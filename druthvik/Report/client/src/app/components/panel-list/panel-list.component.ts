import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel.model';
import { PanelService } from '../../services/panel.service';
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
  searchallPanles?: Panel[];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listPanels();
    this.listTests();
    this.showForm = false;
  }

  //This block of code is used to generate random string
  randomString(length: number) {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  async listPanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanel();
    this.searchallPanles = this.panels;
  }

  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }

  async addPanel() {
    this.showForm = true;
  }

  async canclePanel() {
    this.showForm = false;
    this.addPanelForm = false;
    this.showButton = false;
  }

  async editTest(test: Test) {
    this.test = test;
    this.showDropdown = true;
  }

  async savePanel() {
    this.submitted = true;
    const panel: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panel);
    this.showForm = false;
    this.listPanels();
  }

  async onSelectedPanel(test: Test) {
    if (this.tests) {
      for (const tests of this.tests) {
        if (tests.id === test.id) {
          this.selectedTests.push(tests);
        }
      }
    }
  }

  async updatePanel(): Promise<void> {
    const panel: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      test: this.panel.test,
    };
    panel.test = this.selectedTests;
    await this.panelService.update(panel);
    this.addPanelForm = false;
    this.showDropdown = false;
    this.testTable = true;
  }

  async saveReport() {
    const report: Report = {
      name: this.report.name,
    };
    this.savedReport = await this.panelService.createReport(report);
    if (this.savedReport && this.savedReport.id) {
      localStorage.setItem('reportId', this.savedReport.id + '');
    }
  }

  async searchPanels(event: Event) {
    this.searchallPanles = this.panels.filter((obj) => {
      return (
        obj.name!.startsWith((event.target as HTMLInputElement).value) ||
        obj.description!.startsWith((event.target as HTMLInputElement).value)
      );
    });
  }
}
