import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourceComponent } from './cource.component';

describe('CourceComponent', () => {
  let component: CourceComponent;
  let fixture: ComponentFixture<CourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
