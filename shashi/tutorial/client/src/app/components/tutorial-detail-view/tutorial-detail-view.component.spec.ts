import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDetailViewComponent } from './tutorial-detail-view.component';

describe('TutorialDetailViewComponent', () => {
  let component: TutorialDetailViewComponent;
  let fixture: ComponentFixture<TutorialDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialDetailViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
