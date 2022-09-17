import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.serveice';

@Component({
  selector: 'app-add-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.css'],
})
export class AddPanelComponent implements OnInit {
  submitted = false;
  panels?: Panel[];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {}
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getAll();
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
  canclePanel() {
    this.panel = {
      name: '',
      description: '',
    };
  }
}
