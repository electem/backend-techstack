import { Component, OnInit } from '@angular/core';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
import { Panel } from 'src/app/models/pannel';
import { Test } from 'src/app/models/test';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-pannellist',
  templateUrl: './pannellist.component.html',
  styleUrls: ['./pannellist.component.css'],
})
export class PannellistComponent implements OnInit {
  panels?: Panel[];
  showForm?: boolean;
  currentPanel?: Panel[];
  currentIndex = -1;
  submitted = false;
  Panels: Panel[] = [];
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  editPanelForm?: boolean;
  editTestForm?: boolean;
  dropdown?: boolean;
  test!: Test[];
  reportName?: string;
  selectedTests = new Test();
  tests?: Test = {
    name: '',
  };
  report: Report = {
    name: '',
  };
  selectedTest: Test[] = [];

  filterpanel?: Panel[] ;

  constructor(private PannelserviceService: PannelserviceService) {}

  ngOnInit(): void {
    this.showForm = false;
    this.editPanelForm = false;
    this.retrievePanels();
    this.retrieveTest();
  }
  async saveReport() {
    this.reportName = this.randomString(10);
    const reportData: Report = {
      name: this.reportName,
    };
    await this.PannelserviceService.createReport(reportData);
  }

  onSubmit() {
    alert('Submitted Successfully');
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.PannelserviceService.getAll();
    this.filterpanel=this.panels
  }

  async retrieveTest(): Promise<void> {
    this.test = await this.PannelserviceService.getAllTest();
  }

  onSelected(value: Test) {
    this.selectedTest.push(value);
  }
  addPanel() {
    this.showForm = true;
  }
  cancelPanel() {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
    this.editPanelForm = false;
  }

  editPanel(panel: Panel) {
    this.panel = panel;
    this.showForm = true;
    this.editPanelForm = true;
    this.dropdown = true;
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.PannelserviceService.createPanel(panelData);
    this.retrievePanels();
  }
  async saveTest() {
    this.submitted = true;
    const testData: Test = {
      name: this.tests?.name,
    };
    await this.PannelserviceService.createTest(testData);
    this.retrievePanels();
  }
  async updatePanel() {
    const updateData: Panel = {
      id: this.panel.id,
      name: this.panel.name,
      description: this.panel.description,
      tests: this.panel.tests,
    };
    updateData.tests = this.selectedTest;
    await this.PannelserviceService.updatePanel(updateData);
  }

  cancleTest() {
    this.showForm = false;
    this.tests = {
      name: '',
    };
    this.editTestForm = false;
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
  onKey(event: any) {
    console.log(event.target.value);

    this.filterpanel = this.panels?.filter((panels) => {
      return panels.name?.startsWith(event.target.value);
    });
    console.log(this.filterpanel);
  }
}
