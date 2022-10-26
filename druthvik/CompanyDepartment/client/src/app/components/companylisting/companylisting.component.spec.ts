import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylistingComponent } from './companylisting.component';

describe('CompanylistingComponent', () => {
  let component: CompanylistingComponent;
  let fixture: ComponentFixture<CompanylistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanylistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
