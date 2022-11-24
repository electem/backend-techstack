import { Component } from "react";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
import { Chart, registerables } from "chart.js";

export default class SchoolCharts extends Component {
  schools: ISchoolData[] = [];
  schoolNames: string[] = [];
  teachersCount: number[] = [];
  studentsCount: number[] = [];
  componentDidMount() {
    this.retrieveSchools();
  }

  getcharts() {
    const myChart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: this.schoolNames,
        datasets: [
          {
            label: "Teachers",
            backgroundColor: "yellow",
            data: this.teachersCount,
            borderWidth: 1,
          },
          {
            label: "Students",
            backgroundColor: "red",
            data: this.studentsCount,
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
  schoolsCharts() {
    Chart.register(...registerables);
    const MultiAxisChart = new Chart("MultiAxisChart", {
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
  async retrieveSchools() {
    await schoolService.getAll().then((response: any) => {
      this.schools = response.data;
      this.schoolNames = this.schools.map((name) => name.name);
      this.teachersCount = this.schools.map(
        (teacher) => teacher.teacher?.length!
      );
      this.studentsCount = this.schools.map((count) => {
        return count.students?.length!;
      });
    });
    this.getcharts();
    this.schoolsCharts();
  }

  render() {
    return (
      <>
        <div className="chart">
          <canvas id="myChart"></canvas>
        </div>
        <div className="divChart">
          <canvas id="MultiAxisChart"></canvas>
        </div>
      </>
    );
  }
}
