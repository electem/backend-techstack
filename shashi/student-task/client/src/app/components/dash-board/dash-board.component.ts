import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/student-task-service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  schoolsList: School[] = [];
  teachersList: Teacher[] = [];
  schoolnames: string[] = [];
  schoolTeacher: number[] = [];
  teacherNames: string[] = [];
  schoolCountInTeacher: number[] = [];
  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.retrieveSchools();
    this.retrieveTeachers();
  }
  async getcharts(): Promise<void> {
    Chart.register(...registerables);
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.schoolnames,
        datasets: [
          {
            yAxisID: 'yAxis',
            label: '# of Votes',
            data: this.schoolTeacher,
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

  async retrieveSchools() {
    this.schoolsList = await this.schoolService.getSchools();
    this.schoolnames = this.schoolsList.map((school) => school.schoolname!);
    this.schoolTeacher = this.schoolsList.map(
      (school) => school.teacher.length
    );
    this.getcharts();
  }

  async retrieveTeachers() {
    this.teachersList = await this.schoolService.getTeachers();
    this.teacherNames = this.teachersList.map(
      (teacher) => teacher.teachername!
    );
    this.schoolCountInTeacher = this.teachersList.map(
      (teacher) => teacher.school!.length
    );
    this.callMixedChart();
  }
  public callMixedChart() {
    Chart.register(...registerables);
    const mixedChart = new Chart('myMixedChart', {
      data: {
        datasets: [
          {
            type: 'line',
            label: 'Bar Dataset # Number of Teacher present in each school',
            data: this.schoolTeacher,
            backgroundColor: ['rgba(59, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
          {
            type: 'line',
            label: '# Number of School  each teacher work',
            data: this.schoolCountInTeacher,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
        labels: this.schoolnames,
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
