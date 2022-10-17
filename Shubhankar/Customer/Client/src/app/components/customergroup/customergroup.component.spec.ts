import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomergroupComponent } from './customergroup.component';

describe('CustomergroupComponent', () => {
  let component: CustomergroupComponent;
  let fixture: ComponentFixture<CustomergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
