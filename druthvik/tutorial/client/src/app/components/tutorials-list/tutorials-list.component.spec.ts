import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tutorial } from 'src/app/models/tutorial.model';

import { TutorialsListComponent } from './tutorials-list.component';
const tutorial: Tutorial[] = [
  { title: 'some1', description: 'dd' },
  { title: 'some2', description: 'dd' },
  { title: 'some1', description: 'dd' },
  { title: 'some2', description: 'dd' },
  { title: 'some1', description: 'dd' },
  { title: 'some2', description: 'dd' },
];
describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TutorialsListComponent);
    const app = fixture.componentInstance;
    expect(app.tutorials.length).toEqual(6);
  });
});
