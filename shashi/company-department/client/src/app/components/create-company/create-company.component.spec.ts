import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateCompanyComponent } from './create-company.component';
import { Company } from 'src/app/models/company.model';

describe('CreateCompanyComponent', () => {
  let component: CreateCompanyComponent;
  let fixture: ComponentFixture<CreateCompanyComponent>;
  let button: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCompanyComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should create company object when submit button is clicked', () => {
    const company = new Company();
    console.log(`Component instance ${component}`);
    component.company = company;
    const element = fixture.nativeElement;
    button = element.querySelector('.btn-success');
    const eventType = button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(element.querySelector('input[disabled]').value).toEqual('800');
  });
});
