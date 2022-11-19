import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { IStudentData } from "../../types/student.types";
import StudentDataService from "../../services/student.service";
Chart.register(...registerables);
type Props = {};
type State = {
  data: any;
  options: any;
  students?: Array<IStudentData>;
};

export class chartsStudents extends Component<Props, State> {
  students: IStudentData[] = [];
  studentNames: string[] = [];
  constructor(props: Props) {
    super(props);
    this.state = {
      students: [],
      data: {
        labels: ["red", "blue", "white"],
        datasets: [
          {
            label: "Rainfall",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [65, 59, 80, 81, 56],
          },
        ],
      },
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
  }
  componentDidMount() {
    this.retrieveStudents();
  }

  retrieveStudents() {
    StudentDataService.getAll().then((response: any) => {
      this.setState({
        students: response.data,
      });
    });
  }
  render() {
    return <Line data={this.state.data} options={this.state.options} />;
  }
}
