/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-render-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ChangeEvent } from "react";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
import { IStudentData } from "../../types/student.types";
import studentService from "../../services/student.service";
import Multiselect from "multiselect-react-dropdown";
import teacherService from "../../services/teacher.service";
import { TeacherData } from "../../types/teacher.types";
import { Link } from "react-router-dom";

type Props = {};

type State = ISchoolData & {
  studentList: Array<IStudentData>;
  teacherList: Array<TeacherData>;
};

export default class AddSchool extends Component<Props, State> {
  students: IStudentData[] = [];
  addedStudents: IStudentData[] = [];
  addedTeachers: TeacherData[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleOnChangeTeacher = this.handleOnChangeTeacher.bind(this);
    this.state = {
      schoolid: 0,
      name: "",
      address: "",
      studentList: [],
      teacherList: [],
    };
  }
  componentDidMount() {
    this.retrieveStudents();
    this.retrieveTeachers();
  }

  retrieveTeachers() {
    teacherService
      .getAllTeachers()
      .then((response) => {
        this.setState({
          teacherList: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  retrieveStudents() {
    studentService
      .getAllStudents()
      .then((response) => {
        this.setState({
          studentList: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      address: e.target.value,
    });
  }

  saveSchool = () => {
    const school: ISchoolData = {
      schoolid: this.state.schoolid,
      name: this.state.name,
      address: this.state.address,
      students: this.state.students,
      teacher: this.state.teacher,
    };

    schoolService
      .createSchool(school)
      .then((response) => {
        this.setState({
          schoolid: response.data.schoolid,
          name: response.data.name,
          address: response.data.address,
          students: response.data.students,
          teacher: response.data.teacher,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  handleOnchange(val: []) {
    const students = [];
    for (let i = 0; i < val.length; i++) {
      students.push(val[i]);
    }
  }
  handleOnChangeTeacher(val: []) {
    for (let i = 0; i < val.length; i++) {
      this.addedTeachers.push(val[i]);
    }
    console.log(this.addedTeachers);
  }

  render() {
    const { name, address, studentList, teacherList } = this.state;

    return (
      <div className="container">
        <div className="col-md-4 offset-md-4">
          <h2>Add School</h2>
          <div className="card mb-4">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      value={name}
                      name="name"
                      onChange={this.onChangeName}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      required
                      value={address}
                      name="address"
                      onChange={this.onChangeAddress}
                    />
                  </div>
                  <br />
                  <label htmlFor="address">Students</label>
                  <Multiselect
                    options={studentList}
                    displayValue="name"
                    onSelect={this.handleOnchange}
                  />
                  <br />
                  <label htmlFor="address">Teacher</label>
                  <Multiselect
                    options={teacherList}
                    displayValue="name"
                    onSelect={this.handleOnChangeTeacher}
                  />
                  <br />
                  <button onClick={this.saveSchool} className="btn btn-success">
                    Create
                  </button>
                  <Link to={"/schools"} className="btn btn-secondary cancel">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
