import { Component, OnInit } from '@angular/core';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
import { Panel } from 'src/app/models/pannel';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-pannellist',
  templateUrl: './pannellist.component.html',
  styleUrls: ['./pannellist.component.css'],
})
export class PannellistComponent implements OnInit {
  panels?: Panel[];
  showForm?: boolean;
  currentPanel?: Panel;
  currentIndex = -1;
  submitted = false;
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  editPanelForm?: boolean;
  editTestForm?: boolean;
  dropdown?: boolean;
  test!: Test[];
  selectedTests = new Test();
  tests?: Test = {
    name: '',
  };
  selectedTest: Test[] = [];
  constructor(private PannelserviceService: PannelserviceService) {}

  ngOnInit(): void {
    this.showForm = false;
    this.editPanelForm = false;
    this.retrievePanels();
    this.retrieveTest();
  }
  onSubmit() {
    alert('Submitted Successfully');
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.PannelserviceService.getAll();
  }

  async retrieveTest(): Promise<void> {
    this.test = await this.PannelserviceService.getAllTest();
  }

  onSelected(value: Test) {
    this.selectedTest.push(value);
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
    this.dropdown = true;
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.PannelserviceService.createPanel(panelData);
    this.retrievePanels();
  }
  async saveTest() {
    this.submitted = true;
    const testData: Test = {
      name: this.tests?.name,
    };
    await this.PannelserviceService.createTest(testData);
    this.retrievePanels();
  }
  async updatePanel() {
    const updateData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      tests: this.panel.tests,
    };
    updateData.tests = this.selectedTest;
    await this.PannelserviceService.updatePanel(updateData);
  }

  cancleTest() {
    this.showForm = false;
    this.tests = {
      name: '',
    };
    this.editTestForm = false;
  }
}
