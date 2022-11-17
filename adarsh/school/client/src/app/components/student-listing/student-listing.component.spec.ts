import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListingComponent } from './student-listing.component';

describe('StudentListingComponent', () => {
  let component: StudentListingComponent;
  let fixture: ComponentFixture<StudentListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
