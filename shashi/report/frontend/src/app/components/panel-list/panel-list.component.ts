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
  currentPanel?: Panel;
  currentIndex = -1;
  submitted = false;
  panel: Panel = {
    name: '',
    description: '',
  };
  editPanelForm?: boolean;
  test!: Test[];
  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.showForm = false;
    this.editPanelForm = false;
    this.retrievePanels();
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
}
