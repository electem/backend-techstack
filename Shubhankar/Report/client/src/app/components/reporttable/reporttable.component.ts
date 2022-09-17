import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Panel } from 'src/app/models/pannel';
import { Report } from 'src/app/models/report';
import { Reporttestpanel } from 'src/app/models/reporttestpanel';
import { Test } from 'src/app/models/test';
import { PannelserviceService } from 'src/app/services/pannelservice.service';

@Component({
  selector: 'app-reporttable',
  templateUrl: './reporttable.component.html',
  styleUrls: ['./reporttable.component.css']
})
export class ReporttableComponent implements OnInit {
  panels?: Panel[];
  tests?: Test[];

  constructor(private PannelserviceService: PannelserviceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveTest();
    this.retrievePanels();
    
  }
  async retrievePanels(): Promise<void> {
    this.panels = await this.PannelserviceService.getAll();
  }
  async retrieveTest(): Promise<void> {
    this.tests = await this.PannelserviceService.getAllTest();
  }

  isTestPresentInAPanel(currentPanel :Panel, currentTest:Test){
    if(currentPanel && currentTest && currentPanel.tests && currentPanel.tests.find(test => test.id === currentTest.id )){
      return true;
    } else {
      return false;
    }
}
onBlurMethod(event:any, panel:Panel,test:Test){
   const reportpanel: Reporttestpanel={
    panelid:panel.id,
    testid:test.id,
    data:event.target.value,
   };
   console.log(reportpanel)
   

 }

}
