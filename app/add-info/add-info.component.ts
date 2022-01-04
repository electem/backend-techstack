import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css'],
  providers: [DataService],
})
export class AddInfoComponent implements OnInit {

  infoReceived1: string[] = [];
  infoReceived2: string[] = [];
  infoReceived3: string[] = [];

  getInfoFromService1(): void {
    this.infoReceived1 = this.dservice.getInfo1();
  }
  getInfoFromService2(): void{
    this.infoReceived2 = this.dservice.getInfo2();
  }
  getInfoFromService3(): void {
    this.infoReceived3 = this.dservice.getInfo3();
  }

  constructor(private dservice: DataService) {}

  ngOnInit(): void {
    console.log('Debugging angular application');
  }
   updateInfo(frm: any): void {
    this.dservice.addInfo(frm.value.location);
  }
}
