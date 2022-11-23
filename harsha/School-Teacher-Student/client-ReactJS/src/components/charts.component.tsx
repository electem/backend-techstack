import { Component } from "react";
import { CChart } from "@coreui/react-chartjs";
import SchoolService from "../services/school.service";
import { School } from "../types/school.type";

type Props = {};

type State = {
  schools: Array<School>;
};

export default class Charts extends Component<Props, State> {
  schoolsList: School[] = [];
  schoolNames: any;
  teachersCount: any;
  studentsCount: any;

  componentDidMount() {
    this.retrieveSchools();
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
        this.schoolsList = response.data;
        this.schoolsCharts();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  schoolsCharts() {
    this.schoolNames = this.schoolsList.map((name) => {
      return name.schoolName;
    });
    console.log(this.schoolNames);
    this.teachersCount = this.schoolsList.map((count) => {
      return count.teachers?.length;
    });
    this.studentsCount = this.schoolsList.map((count) => {
      return count.students?.length!;
    });
  }

  render() {
    return (
      <>
        <h4>School Chart</h4>
        <CChart
          type="bar"
          data={{
            labels: this.schoolNames,
            datasets: [
              {
                label: "No of Teachers",
                backgroundColor: "green",
                borderColor: "red",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: this.teachersCount,
              },
              {
                label: "No of Students",
                backgroundColor: "grey",
                borderColor: "yellow",
                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                pointBorderColor: "#fff",
                data: this.studentsCount,
              },
            ],
          }}
        />
      </>
    );
  }
}
