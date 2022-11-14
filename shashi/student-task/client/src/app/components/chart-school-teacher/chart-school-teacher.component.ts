import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/services/student-task-service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart-school-teacher',
  templateUrl: './chart-school-teacher.component.html',
  styleUrls: ['./chart-school-teacher.component.css'],
})
export class ChartSchoolTeacherComponent implements OnInit {
  schoolsList: School[] = [];
  schoolnames: string[] = [];
  schoolTeacher: any[] = [];
  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.retrieveSchools();
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
}
