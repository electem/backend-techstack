import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  companiesNames: String[] = [];
  companies: Company[] = [];
  deptCount: number[] = [];
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  chart() {
    Chart.register(...registerables);
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.companiesNames,
        datasets: [
          {
            label: 'no of Departments',
            data: this.deptCount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
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
  async getCompanies(): Promise<void> {
    this.companies = await this.companyService.getCompanies();
    this.companiesNames = this.companies.map((company) => {
      return company.name!;
    });

    this.deptCount = this.companies.map((company) => {
      return company.departments?.length!;
    });
    this.chart();
  }
}
