import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCmpanyComponent } from './add-cmpany.component';

describe('AddCmpanyComponent', () => {
  let component: AddCmpanyComponent;
  let fixture: ComponentFixture<AddCmpanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCmpanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCmpanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
