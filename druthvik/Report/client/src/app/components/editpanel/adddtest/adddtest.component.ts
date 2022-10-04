import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';
import { Panel } from '../../../models/panel.model';

@Component({
  selector: 'app-adddtest',
  templateUrl: './adddtest.component.html',
  styleUrls: ['./adddtest.component.css'],
})
export class AdddtestComponent implements OnInit {
  tests: Test[];
  panel: Panel = {
    name: '',
    description: '',
    test: [],
  };
  selectedTests: Test[] = [];
  selectedTest = new Test();
  showDropdown: boolean;

  @Input() test1: Test[];
  @Output() selectedcategories = new EventEmitter<Test>();

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.listTests();
    this.listTests1(this.test1);
  }
  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }

  async listTests1(test): Promise<void> {
    this.tests = await this.panelService.getAllTests1(test);
  }

  onSelected(value: Test) {
    if (this.tests) {
      for (const tests of this.tests) {
        if (tests.id === value.id) {
          this.selectedTests.push(tests);
        }
      }
    }
  }
}
