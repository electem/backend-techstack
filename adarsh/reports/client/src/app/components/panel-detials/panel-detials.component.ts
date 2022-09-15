import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panel } from 'src/app/models/panel.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-panel-detials',
  templateUrl: './panel-detials.component.html',
  styleUrls: ['./panel-detials.component.css'],
})
export class PanelDetialsComponent implements OnInit {
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  panels?: Panel[];
  tests?: Test[];
  selectedTest = new Test();
  selectedTestNew = new Test();
  selectedTests: Test[] = [];
  editPanelForm?: boolean;
  showForm?: boolean;
  submitted?: boolean;

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
    console.log();
  }
  editPanel(panel: Panel) {
    this.panel = panel;
  }
  onSelected(value: Test) {
    if (this.tests) {
      for (let test of this.tests) {
        if (test.id == value.id) {
          this.selectedTestNew.name = test.name;
          this.selectedTests.push(this.selectedTestNew);
        }
      }
    }
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
      tests: this.selectedTests,
    };
    await this.panelService.createPanel(panelData);
    this.retrievePanels();
  }
  private async getPanelId(id: Number) {
    this.panel = await this.panelService.getPanelByID(id);
    if (this.panel.tests) {
      this.selectedTest = this.panel.tests[0];
    }
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
