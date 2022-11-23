import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import schoolService from "../../services/school.service";

import ISchoolData from "../../types/school.types";

export default class PieChart extends Component {
  schools: ISchoolData[] = [];
  schoolNames: any;
  schoolteacher: any;
  componentDidMount() {
    this.retrieveSchools();
  }

  retrieveSchools() {
    schoolService.getAll().then((response: any) => {
      this.schools = response.data;
    });
    this.schoolNames = this.schools.map((name) => name.name);
    this.schoolteacher = this.schools.map((teacher) => teacher.teacher?.length);
  }
  render() {
    this.schoolNames = this.schools.map((name) => name.name);
    this.schoolteacher = this.schools.map((teacher) => teacher.teacher?.length);
    const data = {
      labels: this.schoolNames,
      datasets: [
        {
          label: "School Teacher",
          fill: false,
          borderWidth: 2,
          data: this.schoolteacher,
          backgroundColor: ["#FF0000", "#0000FF", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
      },
    };
    return <Pie data={data} />;
  }
}
