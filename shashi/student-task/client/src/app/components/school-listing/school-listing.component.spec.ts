import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListingComponent } from './school-listing.component';

describe('SchoolListingComponent', () => {
  let component: SchoolListingComponent;
  let fixture: ComponentFixture<SchoolListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
