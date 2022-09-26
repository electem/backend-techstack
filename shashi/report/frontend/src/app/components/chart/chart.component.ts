import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PanelService } from 'src/app/services/panel.serveice';
import employeeJson from 'src/app/employeedetails.json';
export interface Employee {
  name?: String;
  salary?: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  employeedetails: Employee[] = employeeJson;
  employeeSalary: number[] = [];
  employeeName: String[] = [];

  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.retrieveEmployeeDetails();
  }

  retrieveEmployeeDetails() {
    this.employeeName = this.employeedetails.map((employee) => employee.name!);
    this.employeeSalary = this.employeedetails.map(
      (employee) => employee.salary!
    );
    Chart.register(...registerables);
    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.employeeName,
        datasets: [
          {
            label: '# of Votes',
            data: this.employeeSalary,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
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
}
