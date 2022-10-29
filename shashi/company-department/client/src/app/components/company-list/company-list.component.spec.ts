import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyListComponent } from './company-list.component';
import { CompanyService } from 'src/app/services/companyDepartment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompanyService', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [CompanyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the list of companies', () => {
    const companiesList: Company[] = [];
    console.log(`Conponent instance ${component}`);
    component.companiesList = companiesList;
    // const element = fixture.nativeElement;
    expect(component).toBeTruthy();
  });
});
