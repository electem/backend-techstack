import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChartComponent } from './student-chart.component';

describe('StudentChartComponent', () => {
  let component: StudentChartComponent;
  let fixture: ComponentFixture<StudentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
