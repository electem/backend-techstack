import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCustomerGroupComponent } from './output-customer-group.component';

describe('OutputCustomerGroupComponent', () => {
  let component: OutputCustomerGroupComponent;
  let fixture: ComponentFixture<OutputCustomerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputCustomerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputCustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
