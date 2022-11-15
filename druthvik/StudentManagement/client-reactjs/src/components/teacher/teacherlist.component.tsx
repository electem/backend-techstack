import { Component } from "react";
import { Link } from "react-router-dom";
import teacherService from "../../services/teacher.service";
import { TeacherData } from "../../types/teacher.types";

type Props = {};

type State = {
  teacher: Array<TeacherData>;
};
export default class TeacherList extends Component<Props, State> {
  teacher: TeacherData[] = [];
  constructor(props: Props) {
    super(props);

    this.state = {
      teacher: [],
    };
  }
  componentDidMount() {
    this.retrieveTeachers();
  }
  retrieveTeachers() {
    teacherService
      .getAll()
      .then((response: any) => {
        this.setState({
          teacher: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { teacher } = this.state;

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
              {teacher.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>{item.teacherid}</td>

                    <td>{item.name}</td>

                    <td>{item.address}</td>
                    <td>
                      <Link
                        to={"/student/" + item.teacherid}
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
