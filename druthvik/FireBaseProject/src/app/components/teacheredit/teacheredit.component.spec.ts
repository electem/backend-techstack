import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachereditComponent } from './teacheredit.component';

describe('TeachereditComponent', () => {
  let component: TeachereditComponent;
  let fixture: ComponentFixture<TeachereditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachereditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
