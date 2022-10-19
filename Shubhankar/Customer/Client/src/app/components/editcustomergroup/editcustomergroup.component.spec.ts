import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomergroupComponent } from './editcustomergroup.component';

describe('EditcustomergroupComponent', () => {
  let component: EditcustomergroupComponent;
  let fixture: ComponentFixture<EditcustomergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcustomergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcustomergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
