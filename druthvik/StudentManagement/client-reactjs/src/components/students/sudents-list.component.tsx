import { Component } from "react";
import { Link } from "react-router-dom";
import StudentDataService from "../../services/student.service";
import { IStudentData } from "../../types/student.types";

type Props = {};

type State = {
  students: Array<IStudentData>;
};
export default class StudentsList extends Component<Props, State> {
  students: IStudentData[] = [];
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
        console.log(this.students);
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
