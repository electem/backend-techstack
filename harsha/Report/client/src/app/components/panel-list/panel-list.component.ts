import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/panel.model';
import { PanelService } from '../../services/panel.service';
import { Test } from '../../models/test.model';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels?: Panel[];
  tests: Test[] = [];
  selectedTests: Test[] = [];
  selectedTest = new Test();
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  filteredPanels?: Panel[];
  searchText!: string;
  panelForm?: boolean;
  testForm?: boolean;
  report: Report = {
    name: '',
  };
  savedReport = new Report();

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrievePanels();
    this.getTests();
    this.report.name = this.randomString(9);
  }

  randomString(length: number) {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
    this.filteredPanels = this.panels;
  }

  async getTests(): Promise<void> {
    this.tests = await this.panelService.getTests();
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

  async saveReport() {
    const report: Report = {
      name: this.report.name,
    };
    this.savedReport = await this.panelService.createReport(report);
    if (this.savedReport && this.savedReport.id) {
      localStorage.setItem('reportId', this.savedReport.id + '');
    }
  }

  cancelPanel() {
    this.panelForm = false;
  }

  onSearch(event: Event) {
    this.filteredPanels = this.panels!.filter((input) => {
      return (
        input.name?.startsWith((event.target as HTMLInputElement).value) ||
        input.description?.startsWith((event.target as HTMLInputElement).value)
      );
    });
  }
}
