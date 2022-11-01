import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-panel-details',
  templateUrl: './panel-details.component.html',
  styleUrls: ['./panel-details.component.css'],
})
export class PanelDetailsComponent implements OnInit {
  tests: Test[] = [];
  testForm?: boolean;
  panelForm?: boolean;
  selectedTest = new Test();
  selectedTests: Test[] = [];
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };

  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTests();
    this.getPanelById(this.route.snapshot.params.id);
  }

  async getTests(): Promise<void> {
    this.tests = await this.panelService.getTests();
  }

  async getPanelById(id: number) {
    this.currentPanel = await this.panelService.getPanelById(id);
  }

  addTest() {
    this.testForm = true;
  }

  onSelected(value: Panel) {
    if (this.tests) {
      for (const test of this.tests) {
        if (test.id == value.id) {
          this.selectedTests.push(test);
        }
      }
    }
  }

  async updatePanel(): Promise<void> {
    const panel = {
      id: this.currentPanel.id,
      name: this.currentPanel.name,
      description: this.currentPanel.description,
      tests: this.currentPanel.tests,
    };
    panel.tests = this.selectedTests;
    await this.panelService.updatePanel(this.currentPanel.id!, panel);
  }

  cancelPanel() {
    this.panelForm = false;
  }
}
