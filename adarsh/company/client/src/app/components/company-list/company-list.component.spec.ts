import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLIstComponent } from './company-list.component';

describe('CompanyLIstComponent', () => {
  let component: CompanyLIstComponent;
  let fixture: ComponentFixture<CompanyLIstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyLIstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
