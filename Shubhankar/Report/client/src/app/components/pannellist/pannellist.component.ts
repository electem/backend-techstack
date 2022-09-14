import { Component, OnInit } from '@angular/core';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
import { Panel } from 'src/app/models/pannel';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-pannellist',
  templateUrl: './pannellist.component.html',
  styleUrls: ['./pannellist.component.css']
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
  };
  editPanelForm?: boolean;
  test!: Test[];
  constructor(private PannelserviceService: PannelserviceService) {}

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
    this.panels = await this.PannelserviceService.getAll();
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
    await this.PannelserviceService.createPanel(panelData);
    this.retrievePanels();
  }
}
