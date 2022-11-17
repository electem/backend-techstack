import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { School } from 'src/app/models/school';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
 schools:School[]=[];
  teachers:Teacher[]=[];
  schoolNames: string[]=[];
  teacherCount: number[]=[];
  SchoolCount: number[]=[];
  teachertName: string[]=[];

  constructor(private schoolService: SchoolService,) {}

  ngOnInit(): void {
    this.retrieveSchools();
    this.retrieveTeachers();
  }

  chartForCompany() {
    Chart.register(...registerables);
    var myChart = new Chart('myChart', {
      type: 'bar',

      data: {
        labels: this.schoolNames,
        datasets: [
          {
            label: '# Marks Of Student',
            data: this.teacherCount,
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
  async retrieveSchools() {
    this.schools = await this.schoolService.getSchool();
    this.schoolNames = this.schools.map((item) => {
      return item.name!;
    });
    this.teacherCount = this.schools.map((item) => {
      return item.teachers?.length!;
    });
    this.chartForCompany();
  }
  async retrieveTeachers() {
    this.teachers = await this.schoolService.getTeachers();
    this.teachertName = this.teachers.map((item) => {
      return item.name!;
    });
    this.SchoolCount = this.teachers.map((item) => {
      return item.schools?.length!;
    });
    this.chartForTeacherAndSchool();
  }
  
  chartForTeacherAndSchool() {
    Chart.register(...registerables);
    var myMultiAxisChart = new Chart('myMultiAxisChart', {
      type: 'line',

      data: {
        labels: this.schoolNames,
        datasets: [
          {
            label: '# Number Of teacher',
            data: this.teacherCount,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.4,
            yAxisID: 'teacheNumber',
          },
          {
            label: '# Number Of school',
            data: this.SchoolCount,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.4,
            yAxisID: 'schoolNumber',
          },
        ],
      },
      options: {
        scales: {
          teacheNumber: {
            beginAtZero: false,
            type: 'linear',
            position: 'left',
          },
          schoolNumber: {
            beginAtZero: false,
            type: 'linear',
            position: 'right',
          },
        },
      },
    });
  }
}
