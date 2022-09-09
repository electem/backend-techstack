import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bootstrap2Component } from './bootstrap2.component';

describe('Bootstrap2Component', () => {
  let component: Bootstrap2Component;
  let fixture: ComponentFixture<Bootstrap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bootstrap2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bootstrap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
