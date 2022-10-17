import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupListingComponent } from './customer-group-listing.component';

describe('CustomerGroupListingComponent', () => {
  let component: CustomerGroupListingComponent;
  let fixture: ComponentFixture<CustomerGroupListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
