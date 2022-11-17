import { Component } from "react";
import TeacherService from "../services/teacher.service";
import { Link } from "react-router-dom";
import { Teacher } from "../types/teacher.type";

type Props = {};

type State = {
  teachers: Array<Teacher>;
};

export default class TeachersList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveTeachers = this.retrieveTeachers.bind(this);

    this.state = {
      teachers: [],
    };
  }

  componentDidMount() {
    this.retrieveTeachers();
  }

  retrieveTeachers() {
    TeacherService.getTeachers()
      .then((response: any) => {
        this.setState({
          teachers: response.data,
        });
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
                          <Link to={"/edit-teacher"}>
                            <button type="button" className="btn btn-primary">
                              Edit
                            </button>
                          </Link>
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
