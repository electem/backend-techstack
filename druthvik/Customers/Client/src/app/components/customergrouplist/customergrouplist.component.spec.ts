import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomergrouplistComponent } from './customergrouplist.component';

describe('CustomergrouplistComponent', () => {
  let component: CustomergrouplistComponent;
  let fixture: ComponentFixture<CustomergrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomergrouplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomergrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
