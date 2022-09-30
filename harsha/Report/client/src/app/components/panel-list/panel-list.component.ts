import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { Test } from 'src/app/models/test.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  selectedTests: Test[] = [];
  selectedTest = new Test();
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };

  panelForm?: boolean;
  testForm?: boolean;
  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
  }

  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }

  async getTests(): Promise<void> {
    this.tests = await this.panelService.getTests();
  }

  onSelected(value: Panel) {
    if (this.tests) {
      for (let test of this.tests) {
        if (test.id == value.id) {
          this.selectedTests.push(test);
        }
      }
    }
  }

  addPanel() {
    this.panelForm = true;
  }

  addTest() {
    this.testForm = true;
  }

  async savePanel(): Promise<void> {
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanelByMap(panelData);
    this.panelForm = false;
  }

  cancelPanel() {
    this.panelForm = false;
  }
}
