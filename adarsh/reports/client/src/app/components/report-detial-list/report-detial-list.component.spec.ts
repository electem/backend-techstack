import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetialListComponent } from './report-detial-list.component';

describe('ReportDetialListComponent', () => {
  let component: ReportDetialListComponent;
  let fixture: ComponentFixture<ReportDetialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDetialListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
