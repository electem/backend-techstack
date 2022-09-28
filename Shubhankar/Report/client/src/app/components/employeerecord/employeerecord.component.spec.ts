import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerecordComponent } from './employeerecord.component';

describe('EmployeerecordComponent', () => {
  let component: EmployeerecordComponent;
  let fixture: ComponentFixture<EmployeerecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeerecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
