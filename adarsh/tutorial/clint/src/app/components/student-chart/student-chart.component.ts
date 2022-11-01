import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.css'],
})
export class StudentChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables);
    var myChart = new Chart('myChart', {
      type: 'radar',
      data: {
        labels: ['Shiva', 'Drithvi', 'Harsh', 'Shubhankar', 'Adarsh', 'Shahi'],
        datasets: [
          {
            label: '# Marks Of Student',
            data: [12, 19, 3, 5, 2, 3],
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
            beginAtZero: false,
          },
        },
      },
    });
  }
}
