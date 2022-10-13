import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Panel } from '../../models/panel.model';
import { Test } from '../../models/test.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-editpanel',
  templateUrl: './editpanel.component.html',
  styleUrls: ['./editpanel.component.css'],
})
export class EditpanelComponent implements OnInit {
  tests: Test[];
  panel: Panel = {
    name: '',
    description: '',
    test: [],
  };
  test: Test = {
    name: '',
  };
  showDropdown: boolean;
  selectedTests: Test[] = [];
  selectedTest = new Test();

  constructor(
    private panelService: PanelService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.listTests();
    this.getPanelbyId(this.route.snapshot.params.id);
  }

  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }

  async getPanelbyId(id: number) {
    this.panel = await this.panelService.getPanelById(id);
  }

  async editTest() {
    this.showDropdown = true;
  }

  async updatePanel(): Promise<void> {
    const panelData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      test: this.panel.test,
    };
    panelData.test = this.selectedTests;
    await this.panelService.update(panelData);
  }

  async savePanel() {
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panelData);
  }

  async onSelectedTest(test: Test) {
    if (this.tests) {
      for (const tests of this.tests) {
        if (tests.id === test.id) {
          this.selectedTests.push(tests);
        }
      }
    }
  }
}
