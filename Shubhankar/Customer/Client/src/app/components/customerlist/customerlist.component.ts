import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {

  customers: Customer[] =[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.retrievecustomers();
  }
  
  
   async retrievecustomers(): Promise<void>  {
    this.customers = await this.userService.getAll();
   console.log(this.customers);
}
click(){
  this.router.navigate(['/add']);
}
}
