import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.panels = await this.panelService.getPanels();
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
