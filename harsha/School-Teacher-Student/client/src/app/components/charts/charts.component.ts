import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { School } from 'src/app/models/school.model';
import { Teacher } from 'src/app/models/teacher.model';
import { SchoolService } from 'src/app/services/school.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  schools: School[] = [];
  teachers: Teacher[] = [];
  teacherNames: string[] = [];
  schoolsCount: number[] = [];
  schoolNames: string[] = [];
  teachersCount: number[] = [];
  studentsCount: number[] = [];

  constructor(
    private teacherService: TeacherService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    this.getTeachers();
    this.getSchools();
  }

  async getTeachers(): Promise<void> {
    this.teachers = await this.teacherService.getTeachers();
    this.teacherNames = this.teachers.map((name) => {
      return name.teacherName!;
    });
    this.schoolsCount = this.teachers.map((count) => {
      return count.schools?.length!;
    });
    this.chartsForTeacherAndSchool();
  }

  chartsForTeacherAndSchool() {
    Chart.register(...registerables);
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [this.teacherNames],
        datasets: [
          {
            label: 'no of Votes',
            data: [this.schoolsCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
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

  async getSchools(): Promise<void> {
    this.schools = await this.schoolService.getSchools();
    this.schoolNames = this.schools.map((name) => {
      return name.schoolName!;
    });
    this.teachersCount = this.schools.map((count) => {
      return count.teachers?.length!;
    });
    this.studentsCount = this.schools.map((count) => {
      return count.students?.length!;
    });
    this.chartForStudentAndTeacherAndSchool();
  }

  chartForStudentAndTeacherAndSchool() {
    Chart.register(...registerables);
    var myMultiAxisChart = new Chart('myMultiAxisChart', {
      type: 'line',
      data: {
        labels: this.schoolNames,
        datasets: [
          {
            label: '# Number Of teachers',
            data: this.teachersCount,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.4,
            yAxisID: 'teacherNumber',
          },
          {
            label: '# Number Of students',
            data: this.studentsCount,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.4,
            yAxisID: 'studentNumber',
          },
        ],
      },
      options: {
        scales: {
          teacherNumber: {
            beginAtZero: false,
            type: 'linear',
            position: 'left',
          },
          studentNumber: {
            beginAtZero: false,
            type: 'linear',
            position: 'right',
          },
        },
      },
    });
  }
}
