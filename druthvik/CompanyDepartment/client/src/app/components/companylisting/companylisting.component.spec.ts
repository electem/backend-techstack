import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylistingComponent } from './companylisting.component';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

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

  it(`should have as title 'Angular11Crud'`, () => {
    const fixture = TestBed.createComponent(CompanylistingComponent);
    const app = fixture.componentInstance;
    expect(app.companies.length).toBeGreaterThanOrEqual(1);
  });
});
