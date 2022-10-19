import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialViewDetialsComponent } from './tutorial-view-detials.component';

describe('TutorialViewDetialsComponent', () => {
  let component: TutorialViewDetialsComponent;
  let fixture: ComponentFixture<TutorialViewDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialViewDetialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialViewDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
