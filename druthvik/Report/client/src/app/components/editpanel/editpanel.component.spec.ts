import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpanelComponent } from './editpanel.component';

describe('EditpanelComponent', () => {
  let component: EditpanelComponent;
  let fixture: ComponentFixture<EditpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
