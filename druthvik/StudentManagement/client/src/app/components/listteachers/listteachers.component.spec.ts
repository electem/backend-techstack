import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListteachersComponent } from './listteachers.component';

describe('ListteachersComponent', () => {
  let component: ListteachersComponent;
  let fixture: ComponentFixture<ListteachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListteachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListteachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
