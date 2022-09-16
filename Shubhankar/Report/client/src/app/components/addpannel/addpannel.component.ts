import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/pannel';
import { PannelserviceService } from 'src/app/services/pannelservice.service';
@Component({
  selector: 'app-addpannel',
  templateUrl: './addpannel.component.html',
  styleUrls: ['./addpannel.component.css']
})
export class AddpannelComponent implements OnInit {
  submitted = false;
  showForm?: boolean;
  panel: Panel = {
    name: '',
    description: '',
    tests: [],
  };

  constructor(private PannelserviceService: PannelserviceService) { }

  ngOnInit(): void {
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
  }
  async savePanel() {
    this.submitted = true;
    const panelData: Panel = {
      name: this.panel.name,
      description: this.panel.description,
    };
    await this.PannelserviceService.createPanel(panelData);
    
  }
}

