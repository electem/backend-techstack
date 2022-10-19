import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.serveice';
import { Panel } from '../../models/panel.model';
import { Test } from '../../models/test.model';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})

export class PanelListComponent implements OnInit {
  panels!: Panel[];
  showForm?: boolean;
  Testdropdown?: boolean;
  currentPanel?: Panel;
  currentIndex = -1;
  submitted = false;
  reports!: Report[];
  searchallPanles?: Panel[];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  test: Test = {
    name: '',
  };
  report: Report = {
    name: this.randomString(10),
  };
  editPanelForm?: boolean;
  showbutton?: boolean;
  tests!: Test[];
  selectedTests: Test[] = [];
  savedReport = new Report();
  public selectedtests = new Test();

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.showForm = false;
    this.editPanelForm = false;
    this.retrievePanels();
    this.retrieveTests();
  }
  
  onSubmit(): void {
    alert(
      'Form Submitted succesfully!!!\n Check the values in browser console.'
    );
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanels();
    this.searchallPanles = this.panels;
  }

  async addPanel(): Promise<void> {}

  async canclePanel(): Promise<void> {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
    this.editPanelForm = true;
  }

  async editPanel(panel: Panel): Promise<void> {
    this.panel = panel;
    this.showForm = true;
    this.editPanelForm = true;
    this.showbutton = true;
  }

  async retrieveTests(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }

  async onSelectedTest(testValue: Test): Promise<void> {
    if (this.tests) {
      for (const test of this.tests) {
        if (test.id === testValue.id) {
          this.selectedTests.push(test);
        }
      }
    }
  }

  async addTest(test: Test): Promise<void> {
    this.test = test;
    this.Testdropdown = true;
  }

  async updatePanel(): Promise<void> {
    const panelData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      tests: this.panel.tests,
    };
    panelData.tests = this.selectedTests;
    await this.panelService.updatePanel(panelData);
  }
  
  async saveReport(): Promise<void> {
    const reportData: Report = {
      name: this.report.name,
    };
    this.savedReport = await this.panelService.createReport(reportData);
  }

  randomString(length: number): string {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
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