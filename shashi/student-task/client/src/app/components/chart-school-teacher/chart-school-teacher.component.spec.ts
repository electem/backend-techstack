import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSchoolTeacherComponent } from './chart-school-teacher.component';

describe('ChartSchoolTeacherComponent', () => {
  let component: ChartSchoolTeacherComponent;
  let fixture: ComponentFixture<ChartSchoolTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSchoolTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSchoolTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
