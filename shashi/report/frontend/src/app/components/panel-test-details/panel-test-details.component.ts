import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.serveice';

@Component({
  selector: 'app-panel-test-details',
  templateUrl: './panel-test-details.component.html',
  styleUrls: ['./panel-test-details.component.css'],
})
export class PanelTestDetailsComponent implements OnInit {
  panels?: Panel[];
  tests?: Test[];
  currentPanel?: Panel;
  disableTextbox?:boolean;
  selectedTests: Test[] = [];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.retrieveTests();
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getAll();
  }
  async retrieveTests(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }
  toggleDisable() {
    const panelData: Panel = {
      tests: this.panel.tests,
    };
    this.disableTextbox=false;
    panelData.tests == this.selectedTests;
  }
}
