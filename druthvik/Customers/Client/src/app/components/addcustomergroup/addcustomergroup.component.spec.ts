import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomergroupComponent } from './addcustomergroup.component';

describe('AddcustomergroupComponent', () => {
  let component: AddcustomergroupComponent;
  let fixture: ComponentFixture<AddcustomergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcustomergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcustomergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
