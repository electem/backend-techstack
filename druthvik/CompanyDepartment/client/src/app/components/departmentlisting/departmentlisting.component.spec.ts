import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentlistingComponent } from './departmentlisting.component';

describe('DepartmentlistingComponent', () => {
  let component: DepartmentlistingComponent;
  let fixture: ComponentFixture<DepartmentlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
