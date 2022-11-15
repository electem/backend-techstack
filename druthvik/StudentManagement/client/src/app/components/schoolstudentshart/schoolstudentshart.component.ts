import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { School } from 'src/app/models/school.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/school.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-schoolstudentshart',
  templateUrl: './schoolstudentshart.component.html',
  styleUrls: ['./schoolstudentshart.component.css'],
})
export class SchoolstudentshartComponent implements OnInit {
  teacher: Teacher[];
  teachernames: string[] = [];
  schoolteacher: number[] = [];
  school: School[];
  schoolnames: string[] = [];
  schoolstudents: number[] = [];
  public sidebarShow: boolean = false;
  constructor(
    private schoolservices: SchoolService,
    private teacherservices: TeacherService,
  ) {}

  ngOnInit(): void {
    this.retrieveSchools();
    this.retrieveTeachers();
  }
  getcharts() {
    Chart.register(...registerables);
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.schoolnames,
        datasets: [
          {
            yAxisID: 'yAxis',
            label: '# of Students',
            data: this.schoolstudents,
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

  async retrieveSchools(): Promise<void> {
    this.school = await this.schoolservices.getSchools();
    this.schoolnames = this.school.map((school) => school.name);
    this.schoolteacher = this.school.map(
      (students) => students.students.length,
    );
    this.getcharts();
  }

  async retrieveTeachers() {
    this.school = await this.schoolservices.getSchools();
    this.teachernames = this.school.map((school) => school.name);
    this.schoolteacher = this.school.map((teacher) => teacher.teacher.length);
    this.callMixedChart();
  }
  public callMixedChart() {
    Chart.register(...registerables);
    const mixedChart = new Chart('myMixedChart', {
      data: {
        datasets: [
          {
            type: 'bar',
            label: 'Bar Dataset # Number of Teacher present in each school',
            data: this.schoolteacher,
            backgroundColor: ['rgba(59, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: '# Number of School  each teacher work',
            data: this.schoolstudents,
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
