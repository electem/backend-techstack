import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { of } from 'rxjs';

import { ListschoolsComponent } from './listschools.component';
import { SchoolService } from '../../services/school.service';
import { APP_BASE_HREF } from '@angular/common';

const dataArray = [
  {
    studentid: 7,
    name: 'gg',
    address: 'assssssss',
    phonenumber: 3434353,
    email: 'test@gmail.com',
    gender: 'Female',
    dateofbirth: '2022-11-16T18:30:00.000Z',
    createdAt: '2022-11-15T06:42:27.126Z',
  },
  ,
  {
    studentid: 8,
    name: 'Rack1',
    address: 'zzzz',
    phonenumber: 3434353,
    email: 'test@gmail.com',
    gender: 'Female',
    dateofbirth: '2022-11-11T18:30:00.000Z',
    createdAt: '2022-11-15T06:45:16.771Z',
  },
];
const mockAPIService = {
  getData: jest.fn(),
};
describe('ListschoolsComponent', () => {
  let component: ListschoolsComponent;
  let fixture: ComponentFixture<ListschoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListschoolsComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: SchoolService, useValue: mockAPIService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListschoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
    mockAPIService.getData.mockReset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance', inject(
    [SchoolService],
    (injectService: SchoolService) => {
      const service = TestBed.get(SchoolService);
      expect(injectService).toBe(service);
    },
  ));
  it('should return a list if data available', async () => {
    fixture = TestBed.createComponent(ListschoolsComponent);
    component = fixture.componentInstance;
    mockAPIService.getData.mockImplementationOnce(() => of(dataArray));
    component.ngOnInit();
    expect(component.schools.length).toBeGreaterThanOrEqual(1);
  });
});
