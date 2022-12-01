import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import StudentDataService from "../../services/student.service";
import { IStudentData } from "../../types/student.types";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = {
  students: Array<IStudentData>;
};
export default class StudentsList extends Component<Props, State> {
  students: IStudentData[] = [];

  constructor(props: Props) {
    super(props);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    this.retrieveStudents();
  }
  retrieveStudents() {
    StudentDataService.getAllStudents()
      .then((response) => {
        this.setState({
          students: response.data,
        });
        console.log(this.students);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteStudent(id: number) {
    StudentDataService.deleteStudent(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/studentlist");
      })

      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { students } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Students List</h4>

          <table className="table table-bordered table-hover table-bordered border-secondary">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>edit</th>
              </tr>
            </thead>

            <tbody>
              {students.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>{item.studentid}</td>

                    <td>{item.name}</td>

                    <td>{item.address}</td>
                    <td>
                      <Link
                        to={"/students/" + item.studentid}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="badge badge-danger marignleft"
                        onClick={() => this.deleteStudent(item.studentid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
