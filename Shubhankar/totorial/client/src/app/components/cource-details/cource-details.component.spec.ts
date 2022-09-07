import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourceDetailsComponent } from './cource-details.component';

describe('CourceDetailsComponent', () => {
  let component: CourceDetailsComponent;
  let fixture: ComponentFixture<CourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
