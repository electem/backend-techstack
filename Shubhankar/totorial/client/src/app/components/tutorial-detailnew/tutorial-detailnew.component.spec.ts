import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDetailnewComponent } from './tutorial-detailnew.component';

describe('TutorialDetailnewComponent', () => {
  let component: TutorialDetailnewComponent;
  let fixture: ComponentFixture<TutorialDetailnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialDetailnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetailnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
