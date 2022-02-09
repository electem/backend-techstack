import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestJsonComponent } from './test-json.component';

describe('TestJsonComponent', () => {
  let component: TestJsonComponent;
  let fixture: ComponentFixture<TestJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
