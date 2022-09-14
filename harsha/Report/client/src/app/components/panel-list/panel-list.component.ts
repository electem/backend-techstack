import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { Test } from 'src/app/models/test.model';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels: Panel[] = [];
  currentIndex = -1;
  tests: Test[] = [];
  selectedTests: Test[] = [];
  selectedTestNew = new Test();
  selectedTest = new Test();
  editForm: boolean = false;
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  panelForm?: boolean;
  testForm?: boolean;

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
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
          this.selectedTests.push(this.selectedTestNew);
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
    this.panel = panel;
    this.editForm = true;
  }

  async savePanel(): Promise<void> {
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panelData);
  }

  async updatePanel(): Promise<void> {
    const panel = {
      id: this.panel.id,
      title: this.panel.name,
      description: this.panel.description,
      tests: this.selectedTests,
    };
    if (this.selectedTests.length) await this.panelService.updatePanel(panel);
  }

  cancelPanel() {
    this.panelForm = false;
    this.panel = {
      name: '',
      description: '',
    };
  }
}
