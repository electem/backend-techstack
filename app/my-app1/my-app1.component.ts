import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-app1',
  templateUrl: './my-app1.component.html',
  styleUrls: ['./my-app1.component.css']
})
export class MyApp1Component implements OnInit {
   title = 'simple project';
   isUserLogIn = true;
   contacts = [ {firstName : 'anil', lastname : 'glb' , number : 125555 },
   { firstName : 'shiva', lastname: 'glb', number : 12143322}, { firstName : 'shiva', lastname: 'glb', number : 14567821},
   { firstName : 'shiva', lastname: 'glb', number : 12222441} ];

  constructor() { }
  ngOnInit(): void {
  }
}
