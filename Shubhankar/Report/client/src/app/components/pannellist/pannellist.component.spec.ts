import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannellistComponent } from './pannellist.component';

describe('PannellistComponent', () => {
  let component: PannellistComponent;
  let fixture: ComponentFixture<PannellistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PannellistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PannellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
