import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListschoolsComponent } from './listschools.component';

describe('ListschoolsComponent', () => {
  let component: ListschoolsComponent;
  let fixture: ComponentFixture<ListschoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListschoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListschoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
