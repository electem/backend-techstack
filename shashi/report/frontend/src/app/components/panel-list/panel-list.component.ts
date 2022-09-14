import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel.serveice';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';

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
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  test: Test = {
    name: '',
  };

  editPanelForm?: boolean;
  showbutton?: boolean;
  tests!: Test[];
  selectedTests: Test[] = [];
  public selectedtests = new Test();
  constructor(private panelService: PanelService) {}

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
    this.panels = await this.panelService.getAll();
  }

  setActivePanel(panel: Panel, index: number): void {
    this.currentPanel = panel;
    this.currentIndex = index;
  }

  addPanel() {
    this.showForm = true;
  }
  canclePanel() {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
    this.editPanelForm = false;
  }

  editPanel(panel: Panel) {
    this.panel = panel;
    this.showForm = true;
    this.editPanelForm = true;
    this.showbutton = true;
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panelData);
    this.retrievePanels();
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
}
