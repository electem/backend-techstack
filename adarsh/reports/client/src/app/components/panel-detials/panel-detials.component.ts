import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panel } from '../../models/panel.model';
import { Test } from '../../models/test.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-panel-detials',
  templateUrl: './panel-detials.component.html',
  styleUrls: ['./panel-detials.component.css'],
})
export class PanelDetialsComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  editPanelForm?: boolean;
  showForm?: boolean;
  submitted?: boolean;
  selectedTestNew = new Test();
  selectedTests: Test[] = [];
  selectedTest = new Test();

  constructor(
    private panelService: PanelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.retrieveTest();
    this.getPanelId(this.route.snapshot.params.id);
    this.editPanelForm = false;
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }

  async retrieveTest(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
  }

  editPanel(panel: Panel) {
    this.panel = panel;
  }

  onSelectedTest(testSelected: Test) {
    this.showForm = true;
    if (this.tests) {
      for (const test of this.tests) {
        if (test.id == testSelected.id) {
          this.selectedTests.push(test);
        }
      }
    }
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

  async updatePanel(): Promise<void> {
    const panelData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      tests: this.selectedTests,
    };
    if (this.selectedTests.length)
      await this.panelService.updatePanel(panelData);
  }

  private async getPanelId(id: number) {
    this.panel = await this.panelService.getPanelByID(id);
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
}
