import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoollistingComponent } from './schoollisting.component';

describe('SchoollistingComponent', () => {
  let component: SchoollistingComponent;
  let fixture: ComponentFixture<SchoollistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoollistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoollistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
