import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { Test } from '../../models/test.model';

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
  testTable: boolean;
  panel: Panel = {
    name: '',
    description: '',
    test: [],
  };
  test: Test = {
    name: '',
  };

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listPanels();
    this.listTests();
    this.showForm = false;
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

  editPanel(panel: Panel) {
    this.panel = panel;
    this.showForm = true;
    this.addPanelForm = true;
    this.showButton = true;
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
}
