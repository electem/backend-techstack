import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Company } from 'src/app/models/company.model';
import { Department } from 'src/app/models/department.model';
import { CompanyService } from 'src/app/services/company.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  companies: Company[];
  departments: Department[];
  departmentnames: string[] = [];
  departmentcompanies: number[] = [];
  companynames: string[] = [];
  companydepartments: number[] = [];
  constructor(
    private companyservice: CompanyService,
    private departmentservice: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.retrieveCompanies();
  }

  getCharts() {
    Chart.register(...registerables);
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.departmentnames,
        datasets: [
          {
            label: '# of Votes',
            data: this.departmentcompanies,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  async retrieveCompanies(): Promise<void> {
    this.companies = await this.companyservice.getCompanies();
    this.companynames = this.companies.map((company) => company.name);
    this.companydepartments = this.companies.map(
      (department) => department.department.length,
    );
    this.getCharts();
  }
}
