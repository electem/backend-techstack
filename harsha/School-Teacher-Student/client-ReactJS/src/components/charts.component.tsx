import { Component } from "react";
import SchoolService from "../services/school.service";
import { School } from "../types/school.type";
import { Chart, registerables } from "chart.js";

export default class Charts extends Component {

  schoolsList: School[] = [];
  schoolNames: string[]=[];
  teachersCount: number[]=[];
  studentsCount: number[]=[];

  componentDidMount() {
    this.retrieveSchools();
  }

 async retrieveSchools() {
    await SchoolService.getSchools()
      .then((response: any) => {
       this.schoolsList = response.data;
       this.schoolNames = this.schoolsList.map((name) => {
        return name.schoolName!;
      });
      this.teachersCount = this.schoolsList.map((count) => {
        return count.teachers?.length!;
      });
      this.studentsCount = this.schoolsList.map((count) => {
        return count.students?.length!;
      });
        this.schoolsChart();
        this.schoolsChart2();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  schoolsChart() {
    Chart.register(...registerables);
    var MultiAxisChart = new Chart("MultiAxisChart", {
      type: "line",
      data: {
        labels: this.schoolNames,
        datasets: [
          {
            label: "# Number Of teachers",
            data: this.teachersCount,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.4,
            yAxisID: "teacherNumber",
          },
          {
            label: "# Number Of students",
            data: this.studentsCount,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: "rgba(54, 162, 235, 1)",
            tension: 0.4,
            yAxisID: "studentNumber",
          },
        ],
      },
      options: {
        scales: {
          teacherNumber: {
            beginAtZero: false,
            type: "linear",
            position: "left",
          },
          studentNumber: {
            beginAtZero: false,
            type: "linear",
            position: "right",
          },
        },
      },
    });
  }
  schoolsChart2() {
    Chart.register(...registerables);
    var MultiChart = new Chart("MultiChart", {
      type: "bar",
      data: {
        labels: this.schoolNames,
        datasets: [
          {
            label: "# Number Of teachers",
            data: this.teachersCount,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: "rgba(255, 99, 132, 1)",
            yAxisID: "teacherNumber",
          },
          {
            label: "# Number Of students",
            data: this.studentsCount,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: "rgba(54, 162, 235, 1)",
            yAxisID: "studentNumber",
          },
        ],
      },
      options: {
        scales: {
          teacherNumber: {
            beginAtZero: false,
            type: "linear",
            position: "left",
          },
          studentNumber: {
            beginAtZero: false,
            type: "linear",
            position: "right",
          },
        },
      },
    });
  }

  render() {
    return (
      <>
        <h4>School Chart</h4>
        <div className="chart">
          <canvas id="MultiAxisChart"></canvas>
        </div>

        <div className="divChart">
          <canvas id="MultiChart"></canvas>
        </div>
      </>
    );
  }
}
