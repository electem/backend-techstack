import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/auth/auth.service';
import { Company } from '../../models/company';
import { Department } from '../../models/department';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  companys: Company[] = [];
  companyNames: string[] = [];
  departmentCount: number[] = [];
  departments: Department[] = [];
  departmentNames: string[] = [];
  companyCounts: number[] = [];
  constructor(
    private userservice: UserService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.retrieveCompany();
    this.callMixedChart();
     this.callMixedChart1();
  }

  async retrieveCompany() {
    this.companys = await this.userservice.getCompanys();
    for (var compnay of this.companys) {
      this.companyNames.push(compnay.name!);
      this.departmentCount.push(compnay.department?.length!);
    }
    this.callBarChart();
    this.retrieveDepartment();
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

  public callLineChart() {
    Chart.register(...registerables);
    const myChart = new Chart('myLineChart', {
      type: 'line',
      data: {
        labels: this.departmentNames,
        datasets: [
          {
            label: '# Number of Companys present for each Department',
            data: this.companyCounts,
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

  async retrieveDepartment() {
    this.departments = await this.userservice.getDepartments();
    for (var department of this.departments) {
      this.departmentNames.push(department.name!);
      console.log(this.departmentNames);
      this.companyCounts.push(department.company?.length!);
      console.log(this.companyCounts);
    }
    this.callLineChart();
  }

  public callMixedChart() {
    Chart.register(...registerables);
    const mixedChart = new Chart('myMixedChart', {
      data: {
        datasets: [
          {
            type: 'bar',
            label:
              'Bar Dataset # Number of Departments present in each company',
            data: this.departmentCount,
            backgroundColor: ['rgba(59, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
          {
            type: 'bar',
            label:
              '# Number of Companys present in each department',
            data: this.companyCounts,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
        labels: this.departmentNames,
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

  public callMixedChart1() {
    Chart.register(...registerables);
    const mixedChart = new Chart('myMixedChart1', {
      data: {
        datasets: [
          {
            type: 'line',
            label:
              '# Number of Departments present in each company',
            data: this.departmentCount,
            backgroundColor: ['rgba(59, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
          {
            type: 'line',
            label:
              '# Number of Companys present in each department',
            data: this.companyCounts,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
        labels: this.departmentNames,
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
  logout(): void {
    this.auth.signOut();
  }
}
