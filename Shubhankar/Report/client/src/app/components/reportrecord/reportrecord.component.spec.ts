import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportrecordComponent } from './reportrecord.component';

describe('ReportrecordComponent', () => {
  let component: ReportrecordComponent;
  let fixture: ComponentFixture<ReportrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
