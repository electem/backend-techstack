import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolstudentshartComponent } from './schoolstudentshart.component';

describe('SchoolstudentshartComponent', () => {
  let component: SchoolstudentshartComponent;
  let fixture: ComponentFixture<SchoolstudentshartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolstudentshartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolstudentshartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
