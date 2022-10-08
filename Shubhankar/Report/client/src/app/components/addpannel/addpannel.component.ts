import { Component, OnInit } from '@angular/core';
import { Panel } from '../../models/pannel';
import { PannelService } from '../../services/pannelservice.service';
@Component({
  selector: 'app-addpannel',
  templateUrl: './addpannel.component.html',
  styleUrls: ['./addpannel.component.css'],
})
export class AddpannelComponent implements OnInit {
  submitted = false;
  showForm?: boolean;
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };

  constructor(private PannelService: PannelService) {}

  ngOnInit(): void {}

  addPanel() {
    this.showForm = true;
  }
  cancelPanel() {
    this.showForm = false;
    this.panel = {
      name: '',
      description: '',
    };
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.PannelService.createPanel(panelData);
  }
}
