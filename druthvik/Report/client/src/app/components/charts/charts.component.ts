import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import student from '../../services/students.json';

interface Student {
  id: number;
  name: string;
  salary: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  students: Student[] = student;
  studentName: string[] = [];
  studentSalary: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getSudents();
  }

  getSudents() {
    this.studentName = this.students.map((students) => students.name);
    this.studentSalary = this.students.map((students) => students.salary);
    Chart.register(...registerables);
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.studentName,
        datasets: [
          {
            yAxisID: 'yAxis',
            label: '# of Votes',
            data: this.studentSalary,
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
          yAxis: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
