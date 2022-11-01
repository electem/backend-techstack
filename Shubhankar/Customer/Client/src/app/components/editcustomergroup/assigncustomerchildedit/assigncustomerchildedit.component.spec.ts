import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigncustomerchildeditComponent } from './assigncustomerchildedit.component';

describe('AssigncustomerchildeditComponent', () => {
  let component: AssigncustomerchildeditComponent;
  let fixture: ComponentFixture<AssigncustomerchildeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigncustomerchildeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigncustomerchildeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
