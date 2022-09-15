import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-reporttable',
  templateUrl: './reporttable.component.html',
  styleUrls: ['./reporttable.component.css'],
})
export class ReporttableComponent implements OnInit {
  panels?: Panel[];
  tests: Test[];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listPanels();
    this.listTests();
  }

  async listPanels(): Promise<void> {
    this.panels = await this.panelService.getAllPanel();
  }
  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }
}
