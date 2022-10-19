import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddtestComponent } from './adddtest.component';

describe('AdddtestComponent', () => {
  let component: AdddtestComponent;
  let fixture: ComponentFixture<AdddtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
