import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDetailsNewComponent } from './tutorial-details-new.component';

describe('TutorialDetailsNewComponent', () => {
  let component: TutorialDetailsNewComponent;
  let fixture: ComponentFixture<TutorialDetailsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialDetailsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
