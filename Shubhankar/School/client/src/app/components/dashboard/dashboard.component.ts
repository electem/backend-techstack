import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teachers: Teacher[] = [];
  teacherNames: string[] = [];
  schoolCount: number[] = [];
  schools: School[] = [];
  schoolNames: string[] = [];
  teacherCounts: number[] = [];
  constructor(
    private userservice: SchoolService,
      ) {}

  ngOnInit(): void {
    this.retrieveTeacher();
    this.callMixedChart();
     this.callMixedChart1();
  }

  async retrieveTeacher() {
    this.teachers = await this.userservice.getallTeachers();
    for (var teacher of this.teachers) {
      this.teacherNames.push(teacher.teachername!);
      this.schoolCount.push(teacher.schools?.length!);
    }
    this.callBarChart();
    this.retrieveSchool();
  }

  public callBarChart() {
    Chart.register(...registerables);
    const myCharts = new Chart('myBarChart', {
      type: 'bar',
      data: {
        labels: this.teacherNames,
        datasets: [
          {
            label: '# Teacher work in number of schools',
            data: this.schoolCount,
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
        labels: this.schoolNames,
        datasets: [
          {
            label: '# Number of Teacher in each School',
            data: this.teacherCounts,
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

  async retrieveSchool() {
    this.schools = await this.userservice.getallSchools();
    for (var school of this.schools) {
      this.schoolNames.push(school.schoolname!);
      console.log(this.schoolNames);
     this.teacherCounts.push(school.teachers?.length!);
      console.log(this.teacherCounts);
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
              'Bar Dataset # Number of Teacher present in each school',
            data: this.teacherCounts,
            backgroundColor: ['rgba(59, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
          {
            type: 'bar',
            label:
              '# Number of School  each teacher work',
            data: this.schoolCount,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
        labels: this.schoolNames,
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
              '# Number of Teacher present in each school',
            data: this.teacherCounts,
            backgroundColor: ['rgba(59, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
          {
            type: 'line',
            label:
            '# Number of School  each teacher work',
            data: this.schoolCount,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
        labels: this.schoolNames,
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
