import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Panel } from '../../models/panel.model';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-addpanel',
  templateUrl: './addpanel.component.html',
  styleUrls: ['./addpanel.component.css'],
})
export class AddpanelComponent implements OnInit {
  showForm: boolean;
  submitted = false;
  panel: Panel = {
    name: '',
    description: '',
    test: [],
  };

  constructor(private panelService: PanelService, private router: Router) {}

  ngOnInit(): void {
    this.showForm = false;
  }

  async addPanel() {
    this.showForm = true;
  }

  async canclePanel() {
    this.showForm = false;
  }

  async savePanel() {
    this.submitted = true;
    const panel: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.panelService.createPanel(panel);
    this.showForm = false;
    this.router.navigate(['/panels']);
  }
}
