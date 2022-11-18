import { Component } from "react";
import StudentService from "../services/student.service";
import { Link } from "react-router-dom";
import { Student } from "../types/student.type";

type Props = {};

type State = {
  students: Array<Student>;
};

export default class StudentsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveStudents = this.retrieveStudents.bind(this);

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  retrieveStudents() {
    StudentService.getStudents()
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
      <>
        <div>
          <Link to={"/add-student"}>
            <button type="button" className="btn btn-success">
              Add Student
            </button>
          </Link>
        </div>
        <h4>Students List</h4>
        <div className="list row">
          <div className="col-md-6">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student: Student) => {
                  return (
                    <tr key={student.studentId}>
                      <td>{student.studentId}</td>
                      <td>{student.studentName}</td>
                      <td>{student.address}</td>
                      <td>{student.gender}</td>
                      <td>{student.dateOfBirth}</td>
                      <td>{student.email}</td>
                      <td>{student.createdDate}</td>
                      <td>{student.phoneNo}</td>
                      <td>
                        {
                          <Link to={"/edit-student"}>
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
