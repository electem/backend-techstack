import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  Params,
  Router,
} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreatestudentComponent } from './createstudent.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Student } from 'src/app/models/student.model';
import { BehaviorSubject, of } from 'rxjs';
describe('CreatestudentComponent', () => {
  let component: CreatestudentComponent;
  let fixture: ComponentFixture<CreatestudentComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let routeChangeSource: BehaviorSubject<Params>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [CreatestudentComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeChangeSource.asObservable() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestudentComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.createtStudentForm.controls.name.setValue('');
    component.createtStudentForm.controls.email.setValue('');
    component.createtStudentForm.controls.phone.setValue('');
    component.createtStudentForm.controls.gender.setValue('');
    component.createtStudentForm.controls.school.setValue('');
    expect(component.createtStudentForm.valid).toBeFalsy();
  });
  it('username field validity', () => {
    const name = component.createtStudentForm.controls.name;
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });
  it('email field validity', () => {
    const email = component.createtStudentForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });
  it('phone field validity', () => {
    const phone = component.createtStudentForm.controls.phone;
    expect(phone.valid).toBeFalsy();

    phone.setValue('');
    expect(phone.hasError('required')).toBeTruthy();
  });

  it('should set submitted to true', () => {
    component.createStudentValidate();
    expect(component.submitted).toBeTruthy();
  });
  it('should call onSubmit method', () => {
    spyOn(component, 'createstudent');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.createtStudentForm).toHaveBeenCalledTimes(1);
  });

  it('form should be valid', () => {
    component.createtStudentForm.controls.name.setValue('sasd');
    component.createtStudentForm.controls.email.setValue('sadasd@asd.com');
    component.createtStudentForm.controls.phone.setValue(132456789);
    component.createtStudentForm.controls.gender.setValue('Male');
    component.createtStudentForm.controls.school.setValue({});
    expect(component.createtStudentForm.valid).toBeTruthy();
  });
  it('loads data on route change', fakeAsync(() => {
    const spy = spyOn(component, 'createstudent').and.callThrough();
    routeChangeSource.next({ id: 99 });
    tick();
    expect(spy).toHaveBeenCalledWith(99);
  }));
});
