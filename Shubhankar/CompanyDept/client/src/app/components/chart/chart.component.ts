import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Company } from '../../models/company';
import { Department } from '../../models/department';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  companys: Company[] = [];
  companyNames: string[] = [];
  departmentCount: number[] = [];

  constructor(private userservice: UserService) {}

  ngOnInit(): void {
    this.retrieveCompany();
  }

  async retrieveCompany() {
    this.companys = await this.userservice.getCompanys();
    for (var compnay of this.companys) {
      this.companyNames.push(compnay.name!);
      this.departmentCount.push(compnay.department?.length!);
    }
    this.callBarChart();
  }

  public callBarChart() {
    Chart.register(...registerables);
    const myCharts = new Chart('myBarChart', {
      type: 'bar',
      data: {
        labels: this.companyNames,
        datasets: [
          {
            label: '# Number of Departments present for each compnay',
            data: this.departmentCount,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
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
}
