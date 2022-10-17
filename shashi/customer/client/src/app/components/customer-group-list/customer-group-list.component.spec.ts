import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupListComponent } from './customer-group-list.component';

describe('CustomerGroupListComponent', () => {
  let component: CustomerGroupListComponent;
  let fixture: ComponentFixture<CustomerGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
