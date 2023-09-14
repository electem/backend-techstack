import { Component, OnInit } from '@angular/core';
import { createCustomer } from '../../models/customer.model';
import { customerService, Status } from '../../services/createcustomer.service';
import { DropDownAnimation } from '../../animation'
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes
} from "@angular/animations";

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(
          ":leave",
          [stagger(100, [animate("0.5s", style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ opacity: 0 }),
            stagger(100, [animate("0.5s", style({ opacity: 1 }))])
          ],
          { optional: true }
        )
      ])
    ]),
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    ),
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ]),
    trigger('openClose', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', [animate(500)])
    ]),
    DropDownAnimation
  ]
})
export class CustomerlistComponent implements OnInit {
  customers: createCustomer[] = [];
  isOpen = false;
  isDropdown = false;
  status: Status[];
  status1 = new Status();
  allCustomer: createCustomer[];
  selectedStatus: string;
  statusObject = new Status();
  customerActive: createCustomer[];
  constructor(private customerService: customerService) { }

  ngOnInit(): void {
    this.retrieveCustomers();
    this.status = this.getStatus();
  }

  async retrieveCustomers(): Promise<void> {
    this.customers = await this.customerService.getCustomer();
    this.allCustomer = this.customers;
  }
  getStatus() {
    return this.customerService.getStatus();
  }

  onSelected(value: Status) {
    if (value.name === 'all') {
      this.customers = this.allCustomer;
    } else {
      this.selectedStatus = value.name;
      console.log(value.name);
      this.customers = this.allCustomer.filter((obj) => {
        return obj.status && obj.status === value.name;
      });
    }
  }
  async deletebyid(id: number) {
    await this.customerService.deletCustomerById(id);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
