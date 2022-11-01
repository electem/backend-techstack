import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylistingComponent } from './companylisting.component';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';
import { of } from 'rxjs';
const PAGE = 1;
const PAGE_SIZE = 3;
const SAMPLE_TOTAL = 5;
const SAMPLE_PAGINATION = {
  page: 1,
  pageSize: 2,
  total: SAMPLE_TOTAL,
};
const companyList: Company[] = [
  {
    name: '',
    address: '',
  },
];
describe('CompanylistingComponent', () => {
  let component: CompanylistingComponent;
  let fixture: ComponentFixture<CompanylistingComponent>;
  let companyservice: CompanyService;
  const peopleServiceSpy = {
    getListPeople: jest.fn().mockReturnValue(of(SAMPLE_PAGINATION)),
  };

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

  it('should be created', () => {
    const interceptor: CompanylistingComponent = TestBed.inject(
      CompanylistingComponent,
    );
    console.log(interceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the list of companies', () => {
    const companiesList: Company[] = [];
    console.log(`Conponent instance ${component}`);
    component.companies = companiesList;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular11Crud'`, () => {
    const fixture = TestBed.createComponent(CompanylistingComponent);
    const app = fixture.componentInstance;
    expect(app.companies.length).toBeGreaterThanOrEqual(1);
  });
  it('getBooks get books from the subscription', () => {
    component.retrieveCompanies();
    expect(component.companies.length).toBe(6);
    expect(component.companies).toEqual(companyList);
  });

  it('should set the user', () => {
    component.ngOnInit();
    expect(companyservice.getCompanies()).toHaveBeenCalled();
  });
  describe('ngOnInit', () => {
    it('should call getListPeople', () => {
      expect(peopleServiceSpy.getListPeople).toHaveBeenCalledWith({
        page: component.page,
        pageSize: component.pageSizes,
      });
    });
  });
});
