import { Component } from "react";
import { CChart } from "@coreui/react-chartjs";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
type Props = {};
type State = {
  schools: Array<ISchoolData>;
};
export default class SchoolCharts extends Component<Props, State> {
  schoolsList: ISchoolData[] = [];
  schoolNames: any;
  teachersCount: any;
  studentsCount: any;
  componentDidMount() {
    this.retrieveSchools();
  }
  retrieveSchools() {
    schoolService
      .getAll()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
        this.schoolsList = response.data;
        this.charts();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  charts() {
    this.schoolNames = this.schoolsList.map((name) => {
      return name?.name;
    });
    console.log(this.schoolNames);
    this.teachersCount = this.schoolsList.map((count) => {
      return count.teacher?.length;
    });
    this.studentsCount = this.schoolsList.map((count) => {
      return count.students?.length;
    });
  }
  render() {
    return (
      <CChart
        type="bar"
        data={{
          labels: this.schoolNames,
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "yellow",
              borderColor: "red",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: this.teachersCount,
            },
            {
              label: "My Second dataset",
              backgroundColor: "red",
              borderColor: "yellow",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: this.studentsCount,
            },
          ],
        }}
      />
    );
  }
}
