import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { IStudentData } from "../../types/student.types";
import StudentDataService from "../../services/student.service";

Chart.register(...registerables);
type Props = {};
type State = {
  name: string;
  data: any;
  students: Array<IStudentData>;
};

export class chartsStudents extends Component<Props, State> {
  students: IStudentData[] = [];
  studentNames: string[] = [];
  studentId: number[] = [];
  constructor(props: Props) {
    super(props);
    this.state = {
      students: [],
      name: "React",
      data: {
        datasets: [
          {
            data: this.studentId,
          },
        ],
        labels: this.studentNames,
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
      this.students = this.state.students;
      this.studentNames = this.students.map((option) => option.name);
      this.studentId = this.students.map((option) => option.studentid!);
      console.log(this.studentNames);
    });
  }

  render() {
    return (
      <Line
        data={this.state.data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    );
  }
}
