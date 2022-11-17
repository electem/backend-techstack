import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CreateschoolComponent } from './createschool.component';

describe('CreateschoolComponent', () => {
  let component: CreateschoolComponent;
  let fixture: ComponentFixture<CreateschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateschoolComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onButtonClick when clicked', fakeAsync(() => {
    spyOn(component, 'createSchool');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.createSchoolValidate()).toHaveBeenCalled();
  }));

  it('should call onEditButtonClick() and print console.log', () => {
    component.createSchoolValidate();
    expect(console.log).toHaveBeenCalledWith('Edit button has been clicked!');
  });
});
