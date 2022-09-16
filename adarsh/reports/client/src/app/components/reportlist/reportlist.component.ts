import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Panel } from 'src/app/models/panel.model';
import { Reportlist } from 'src/app/models/reportlist.model';
import { Test } from 'src/app/models/test.model';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css']
})
export class ReportlistComponent implements OnInit {
  panels: Panel[] = [];
  tests: Test[] = [];
  currentPanel: Panel = {
    name: '',
    description: '',
    tests: new Test(),
  };
  reportlist: Reportlist = {
    data: '',
    panelFk: 0,
    testFk: 0,
  };
  

  constructor( private panelService: PanelService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrievePanels();
    this.retrieveTest();
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.panelService.getPanels();
  }
  async retrieveTest(): Promise<void> {
    this.tests = await this.panelService.getAllTest();
    
  }
  isTestPresentInPanel(currentPanel: Panel, currentTest: Test) {
    if (
      currentPanel &&
      currentTest &&
      currentPanel.tests &&
      currentPanel.tests.find(( test ) => test.id === currentTest.id)
    ) {
      return true;
    } else {
      return false;
    }
  }
  onBlurEvent(event: any, panel:Panel, test:Test){
    console.log(event.target.value);
    console.log(panel.id);
    console.log(test.id);
  }
  

}
