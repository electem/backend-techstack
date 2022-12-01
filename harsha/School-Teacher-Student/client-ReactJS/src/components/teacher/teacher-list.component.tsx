import { Component } from "react";
import TeacherService from "../../services/teacher.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { Teacher } from "../../types/teacher.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = {
  teachers: Array<Teacher>;
};

export default class TeachersList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveTeachers = this.retrieveTeachers.bind(this);
    this.deleteTeacher = this.deleteTeacher.bind(this);

    this.state = {
      teachers: [],
    };
  }

  componentDidMount() {
    this.retrieveTeachers();
  }

  retrieveTeachers() {
    TeacherService.getTeachers()
      .then((response) => {
        this.setState({
          teachers: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteTeacher(id: number) {
    TeacherService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/teachers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { teachers } = this.state;

    return (
      <>
        <div>
          <Link to={"/add-teacher"}>
            <button type="button" className="btn btn-success">
              Add Teacher
            </button>
          </Link>
        </div>
        <h4>Teachers List</h4>
        <div className="list row">
          <div className="col-md-8">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher: Teacher) => {
                  return (
                    <tr key={teacher.teacherId}>
                      <td>{teacher.teacherId}</td>
                      <td>{teacher.teacherName}</td>
                      <td>{teacher.address}</td>
                      <td>{teacher.gender}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.createdDate}</td>
                      <td>{teacher.phoneNo}</td>
                      <td>
                        {
                          <>
                            <Link to={"/teachers/" + teacher.teacherId}>
                              <button
                                type="button"
                                className="badge badge-primary"
                              >
                                Edit
                              </button>
                            </Link>
                            <Link to={"/"}>
                              <button
                                type="button"
                                className="badge badge-danger"
                                onClick={() =>
                                  this.deleteTeacher(teacher.teacherId!)
                                }
                              >
                                Delete
                              </button>
                            </Link>
                          </>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
