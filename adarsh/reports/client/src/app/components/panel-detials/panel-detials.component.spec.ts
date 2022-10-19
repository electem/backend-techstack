import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDetialsComponent } from './panel-detials.component';

describe('PanelDetialsComponent', () => {
  let component: PanelDetialsComponent;
  let fixture: ComponentFixture<PanelDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDetialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
