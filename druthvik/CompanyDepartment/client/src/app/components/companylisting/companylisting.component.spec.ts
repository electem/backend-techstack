import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylistingComponent } from './companylisting.component';
import { CompanyService } from 'src/app/services/company.service';

describe('CompanylistingComponent', () => {
  let component: CompanylistingComponent;
  let fixture: ComponentFixture<CompanylistingComponent>;
  let companyservice: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanylistingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.companies.length).toEqual(1);
  });
});
