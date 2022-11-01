import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer';
import { Customergroup } from '../..//models/customergroup';
import { UserService } from '../../services/user.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editcustomergroup',
  templateUrl: './editcustomergroup.component.html',
  styleUrls: ['./editcustomergroup.component.css'],
})
export class EditcustomergroupComponent implements OnInit {
  submitted = false;
  editcustomer!: FormGroup;
  customers: Customer[] = [];
  customerlist: Customer[] = [];
  addedlist: Customer[] = [];
  selectedCustomer: Customer = {};
  removedCustomer: Customer = {};
  selectCustomer?: Customer[] = [];
  customergroup: Customergroup = {
    name: '',
    description: '',
    customers: [],
  };
  currentcustomerEvent: Customer[] = [];

  @Output() newCustomerEvent = new EventEmitter<Customer>();
 
 constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editcustomer = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      customer: ['', Validators.required],
    });
    this.retrievecustomers();
    this.getCustomerGroupById(this.route.snapshot.params.id);
  }
 
  async getCustomerGroupById(id: number) {
    this.customergroup = await this.userService.getCustomergroupid(id);
    this.selectCustomer = this.customergroup.customers;
  }

  async retrievecustomers(): Promise<void> {
    this.customers = await this.userService.getAll();
  }
  public toggleSelection(customer: Customer) {
    this.selectedCustomer = customer;
    this.newCustomerEvent.emit(customer);
  }
  public moveSelected() {
    if (this.selectedCustomer != null) {
      this.selectCustomer?.push(this.selectedCustomer);
      const index = this.customers.indexOf(this.selectedCustomer);
      if (index > -1) {
        this.customers.splice(index, 1);
        this.currentcustomerEvent.push(this.selectedCustomer);
      }
    }
  }

  public toggleSelections(customer: Customer) {
    this.removedCustomer = customer;
}

public moveRight() {
    if (this.removedCustomer != null) {
      this.customers.push(this.removedCustomer);
      const index = this.selectCustomer?.indexOf(this.removedCustomer);
      if (index! > -1) {
        this.selectCustomer?.splice(index!, 1);
        
      }
    }
  }
  async Submit() {
    const customergroup: Customergroup = {
      id: this.customergroup.id,
      name: this.customergroup.name,
      description: this.customergroup.description,
      customers: this.customerlist,
    };
    await this.userService.updatecustomergroup(customergroup,this.customergroup.id!);
    this.router.navigate(['/group']);
  }

  get fval() {
    return this.editcustomer.controls;
  }
  async signup() {
    this.submitted = true;
    if (this.editcustomer.invalid) {
      return;
    }
  }
  Cancel() {
    this.router.navigate(['/group']);
  }
}
