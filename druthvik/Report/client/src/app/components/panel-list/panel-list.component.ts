import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

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

  panel: Panel = {
    name: '',
    description: '',
    test: [],
  };

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listPanels();
    this.showForm = false;
  }

  async listPanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanel();
  }

  addPanel() {
    this.showForm = true;
  }

  canclePanel() {
    this.showForm = false;
    this.addPanelForm = false;
  }

  editPanel(panel: Panel) {
    this.panel = panel;
    this.showForm = true;
    this.addPanelForm = true;
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
}
