import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel.serveice';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report.model';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels?: Panel[];
  showForm?: boolean;
  Testdropdown?: boolean;
  currentPanel?: Panel;
  currentIndex = -1;
  submitted = false;
  reports!: Report[];
  name = 'Simple filter';

  //search
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
  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.showForm = false;
    this.editPanelForm = false;
    this.retrievePanels();
    this.retrieveTests();
  }
  onSubmit() {
    alert(
      'Form Submitted succesfully!!!\n Check the values in browser console.'
    );
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanels();
    //search
    this.searchallPanles = this.panels;
  }

  addPanel() {}
  canclePanel() {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
    this.editPanelForm = true;
  }

  editPanel(panel: Panel) {
    this.panel = panel;
    this.showForm = true;
    this.editPanelForm = true;
    this.showbutton = true;
  }
  async retrieveTests(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }

  onSelected(value: Test) {
    if (this.tests) {
      for (let test of this.tests) {
        if (test.id == value.id) {
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
  async saveReport() {
    const reportData: Report = {
      name: this.report.name,
    };
    this.savedReport = await this.panelService.createReport(reportData);
    // if (this.savedReport && this.savedReport.id) {
    //   localStorage.setItem('reportId', this.savedReport.id + '');
    // }
  }

  //auto generate string
  randomString(length: number): string {
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
  //search panels
  async searchPanels(event: any) {
    this.searchallPanles = this.panels!.filter((obj) => {
      return (
        obj.name!.startsWith(event.target.value) ||
        obj.description!.startsWith(event.target.value)
      );
    });
  }
}
