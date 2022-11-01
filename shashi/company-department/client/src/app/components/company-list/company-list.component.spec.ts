import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyListComponent } from './company-list.component';
import { CompanyService } from 'src/app/services/companyDepartment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompanyService', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let companyService: CompanyService;
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

  it('should set the list of companies', () => {
    component.ngOnInit();
    expect(companyService.getCompanies()).toHaveBeenCalled();
  });

  it('should show the list of companies', () => {
    const companiesTestingList: Company[] = [
      {
        id: 1,
        companyname: 'eigth company',
        address: 'cdcd',
        department: [
          {
            id: 4,
            departmentname: 'fourth department',
            type: 'type 4',
          },
        ],
      },
      {
        id: 2,
        companyname: 'eigth company',
        address: 'cdcd',
        department: [
          {
            id: 4,
            departmentname: 'fourth department',
            type: 'type 4',
          },
        ],
      },
      {
        id: 3,
        companyname: 'eigth company',
        address: 'cdcd',
        department: [
          {
            id: 4,
            departmentname: 'fourth department',
            type: 'type 4',
          },
        ],
      },
      {
        id: 4,
        companyname: 'eigth company',
        address: 'cdcd',
        department: [
          {
            id: 4,
            departmentname: 'fourth department',
            type: 'type 4',
          },
        ],
      },
    ];
    console.log(`Conponent instance ${component}`);
    component.companiesList = companiesTestingList;
    expect(component.companiesList.length).toBe(4);
    expect(component.companiesList).toEqual(companiesTestingList);
    expect(component).toBeTruthy();
  });
});
