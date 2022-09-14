import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/models/panel.model';
import { PanelService } from 'src/app/services/panel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.css'],
})
export class PanelListComponent implements OnInit {
  panels: any;
  currentIndex = -1;
  registerForm!: FormGroup;
  submitted: boolean = false;
  panelForm: boolean = false;
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: [],
  };
  constructor(
    private panelService: PanelService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({});

    this.retrievePanels();
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }

  get validation() {
    return this.registerForm.controls;
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    alert('form fields are validated successfully!');
    this.savePanel();
  }

  async savePanel(): Promise<void> {
    if ((this.panelForm = true)) {
      const data = {
        name: this.currentPanel.name,
        description: this.currentPanel.description,
      };
      await this.panelService.createPanel(data);
      this.router.navigate(['panels']);
    }
  }
}
