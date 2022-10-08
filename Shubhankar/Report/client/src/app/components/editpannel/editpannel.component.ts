import { Component, OnInit } from '@angular/core';
import { PannelService } from '../../services/pannelservice.service';
import { Panel } from '../../models/pannel';
import { Test } from '../../models/test';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editpannel',
  templateUrl: './editpannel.component.html',
  styleUrls: ['./editpannel.component.css'],
})
export class EditpannelComponent implements OnInit {
  panels?: Panel[];
  showForm?: boolean;
  dropdown?: boolean;
  editPanelForm?: boolean;
  submitted = false;
  selectedTest: Test[] = [];
  selectedTests = new Test();
  test!: Test[];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  constructor(
    private pannelService: PannelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showForm = false;
    // this.retrievePanels();
    this.retrievePanelbyid(this.route.snapshot.params.id);
    this.retrieveTest();
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.pannelService.getAll();
  }

  async retrievePanelbyid(id: number) {
    this.panel = await this.pannelService.getPanel(id);
  }

  addPanel() {
    this.showForm = true;
  }
  editPanel(panel: Panel) {
    this.panel = panel;
    this.showForm = true;
    this.editPanelForm = false;
    this.dropdown = true;
  }

  cancelPanel() {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
    this.editPanelForm = false;
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.pannelService.createPanel(panelData);
    this.retrievePanels();
  }
  async retrieveTest(): Promise<void> {
    this.test = await this.pannelService.getAllTest();
  }

  onSelected(value: Test) {
    if (value != null) {
      if (this.test) {
        for (let test of this.test) {
          if (test.id == value.id) {
            this.selectedTest.push(test);
          }
        }
      }
    }
  }
  async updatePanel() {
    const updateData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      tests: this.panel.tests,
    };
    updateData.tests = this.selectedTest;
    await this.pannelService.updatePanel(updateData);
  }
}
