import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardwithchartsComponent } from './dashboardwithcharts.component';

describe('DashboardwithchartsComponent', () => {
  let component: DashboardwithchartsComponent;
  let fixture: ComponentFixture<DashboardwithchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardwithchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardwithchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
