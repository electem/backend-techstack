/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-render-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ChangeEvent, useState } from "react";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
import { IStudentData } from "../../types/student.types";
import studentService from "../../services/student.service";
import Multiselect from "multiselect-react-dropdown";
import { TeacherData } from "../../types/teacher.types";
import teacherService from "../../services/teacher.service";
type Props = {};

type State = ISchoolData & {
  students: Array<IStudentData>;
  teachers: Array<TeacherData>;
};

export default class AddSchool extends Component<Props, State> {
  students: IStudentData[] = [];
  teachers: TeacherData[] = [];
  addedStudents: IStudentData[] = [];
  currentStudent = new IStudentData();
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.state = {
      schoolid: 0,
      name: "",
      address: "",
      students: [],
      teachers: [],
    };
  }
  componentDidMount() {
    this.retrieveStudents();
    this.retrieveTeachers();
  }

  retrieveTeachers() {
    teacherService
      .getAll()
      .then((response: any) => {
        this.setState({
          teachers: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  retrieveStudents() {
    studentService
      .getAll()
      .then((response: any) => {
        this.setState({
          students: response.data,
        });
        console.log(response.data);
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

  onSelectStudents(student: IStudentData) {
    this.currentStudent = student;
    this.addedStudents?.push(this.currentStudent);
  }

  saveSchool = () => {
    const data: ISchoolData = {
      name: this.state.name,
      address: this.state.address,
    };

    schoolService
      .create(data)
      .then((response: any) => {
        this.setState({
          schoolid: response.data.schoolid,
          name: response.data.name,
          address: response.data.address,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  newSchool = () => {
    this.setState({
      schoolid: null,
      name: "",
      address: "",
    });
  };
  render() {
    const { name, address, students, teachers } = this.state;

    return (
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={this.onChangeName}
              name="name"
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
              onChange={this.onChangeAddress}
              name="address"
            />
          </div>
          <br />
          <label htmlFor="address">Students</label>
          <Multiselect options={students} displayValue="name" />
          <br />
          <label htmlFor="address">Students</label>
          <Multiselect
            options={teachers} // Options to display in the dropdown
            displayValue="name" // Property name to display in the dropdown options
          />
          <br />
          <button onClick={this.saveSchool} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
