import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDetialViewComponent } from './tutorial-detial-view.component';

describe('TutorialDetialViewComponent', () => {
  let component: TutorialDetialViewComponent;
  let fixture: ComponentFixture<TutorialDetialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialDetialViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
