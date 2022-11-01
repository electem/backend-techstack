import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Test } from '../../../models/test.model';
import { PanelService } from '../../../services/panel.service';
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
  }

  async listTests(): Promise<void> {
    this.tests = await this.panelService.getAllTests();
  }

  async onSelected(value: Test) {
    if (this.tests) {
      for (const tests of this.tests) {
        if (tests.id === value.id) {
          this.selectedTests.push(tests);
        }
      }
    }
  }
}
