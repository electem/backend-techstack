import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/models/test.model';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels: Panel[] = [];
  showForm?: boolean;
  currentPanel?: Panel;
  currentIndex = -1;
  submitted = false;
  panel: Panel = {
    name: '',
    description: '',
  };
  savereports = new Report();

  editPanelForm?: boolean;
  test!: Test[];
  constructor(
    private panelService: PanelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showForm = false;
    this.editPanelForm = false;
    this.retrievePanels();
    console.log(this.randomString(10));
  }
  onSubmit() {
    alert(
      'Form Submitted succesfully!!!\n Check the values in browser console.'
    );
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
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
    this.router.navigate(['panel']);
  }

  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panelData);
    this.router.navigate(['panel']);
  }
  async saveReport() {
    this.submitted = true;
    const reportData: Report = {
      name: this.randomString(10),
    };
    this.savereports = await this.panelService.createReport(reportData);
    if (this.savereports && this.savereports.id) {
      localStorage.setItem('reportId', this.savereports.id + '');
    }
    this.router.navigate(['report']);
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
}
