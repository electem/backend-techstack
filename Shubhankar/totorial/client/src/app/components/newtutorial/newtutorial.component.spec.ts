import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtutorialComponent } from './newtutorial.component';

describe('NewtutorialComponent', () => {
  let component: NewtutorialComponent;
  let fixture: ComponentFixture<NewtutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewtutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
