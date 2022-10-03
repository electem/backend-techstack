import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel.serveice';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { Report } from 'src/app/models/report.model';

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
  name = 'Simple filter';

  // search
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
    // search
    this.searchallPanles = this.panels;
  }

  addPanel(): void {}
  canclePanel(): void {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
    this.editPanelForm = true;
  }

  editPanel(panel: Panel): void {
    this.panel = panel;
    this.showForm = true;
    this.editPanelForm = true;
    this.showbutton = true;
  }
  async retrieveTests(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }

  onSelected(value: Test): void {
    if (this.tests) {
      for (const test of this.tests) {
        if (test.id === value.id) {
          this.selectedTests.push(test);
        }
      }
    }
  }
  addTest(test: Test): void {
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
    // if (this.savedReport && this.savedReport.id) {
    //   localStorage.setItem('reportId', this.savedReport.id + '');
    // }
  }

  // auto generate string
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
  // search panels
  async searchPanels(event: any): Promise<void> {
    this.searchallPanles = this.panels.filter((obj) => {
      return (
        obj.name!.startsWith(event.target.value) ||
        obj.description!.startsWith(event.target.value)
      );
    });
  }
}
