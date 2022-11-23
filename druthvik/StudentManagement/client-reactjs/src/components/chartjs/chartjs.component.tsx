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

export class charts extends Component<Props, State> {
  student: IStudentData[] = [];
  studentNames: string[] = [];
  schoolLength: number[] = [];
  constructor(props: Props) {
    super(props);
    StudentDataService.getAll().then((response: any) => {
      this.student = response.data;
      console.log(this.student);
      this.studentNames = this.student.map((option) => option.name);
      console.log(this.studentNames);
    });

    this.state = {
      students: [],
      data: {
        labels: [this.studentNames],
        datasets: [
          {
            label: "Rainfall",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [65, 59, 80, 81],
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
    //this.retrieveStudents();
  }

  // retrieveStudents() {
  //   StudentDataService.getAll().then((response: any) => {
  //     this.setState({
  //       students: response.data,
  //     });
  //   });
  // }
  render() {
    return <Line data={this.state.data} options={this.state.options} />;
  }
}
