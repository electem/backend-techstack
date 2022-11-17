import { Component } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import StudentDataService from "../../services/student.service";
import { IStudentData } from "../../types/student.types";

type Props = {};

type State = {
  students: Array<IStudentData>;
};

const columns = [
  {
    name: "studentid",
    selector: "studentid",
  },
  {
    name: "",
    selector: "name",
  },
  {
    name: "",
    selector: "address",
  },
];
export default class StudentsListDatatables extends Component<Props, State> {
  students: IStudentData[] = [];
  studentid: string = "";
  constructor(props: Props) {
    super(props);

    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    this.retrieveStudents();
  }
  retrieveStudents() {
    StudentDataService.getAll()
      .then((response: any) => {
        this.setState({
          students: response.data,
        });
        console.log(response.data);
        this.students = this.state.students;
        this.studentid = JSON.stringify(
          this.students.map((option) => option.studentid)
        );
        console.log(this.studentid);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const columnss = [
      {
        name: "studentid",
        selector: "studentid",
      },
      {
        name: "name",
        selector: "name",
      },
      {
        name: "address",
        selector: "address",
      },
    ];
    const { students } = this.state;

    return (
      <div className="App">
        <DataTable
          title="Students"
          columns={columnss}
          data={students}
          striped
          responsive
          noTableHead
          sortServer
          persistTableHead
          fixedHeader
          pagination
        />
      </div>
    );
  }
}
