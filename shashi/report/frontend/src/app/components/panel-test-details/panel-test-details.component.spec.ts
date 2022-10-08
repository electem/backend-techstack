import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTestDetailsComponent } from './panel-test-details.component';

describe('PanelTestDetailsComponent', () => {
  let component: PanelTestDetailsComponent;
  let fixture: ComponentFixture<PanelTestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelTestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});