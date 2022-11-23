import { Component } from "react";
import DataTable from "react-data-table-component";
import StudentDataService from "../../services/student.service";
import { IStudentData } from "../../types/student.types";
type Props = {};

type State = {
  students: Array<IStudentData>;
};
const columns = [
  {
    name: "Name",
    sortable: true,
    selector: "name",
  },
  {
    name: "Address",
    selector: "address",
    sortable: true,
  },
];
export class StudentsListingDatatables extends Component<Props, State> {
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
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { students } = this.state;
    return (
      <DataTable
        title="Student Lists"
        columns={columns}
        data={students}
        pagination
      />
    );
  }
}
