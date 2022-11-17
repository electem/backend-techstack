import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherlistingComponent } from './teacherlisting.component';

describe('TeacherlistingComponent', () => {
  let component: TeacherlistingComponent;
  let fixture: ComponentFixture<TeacherlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
