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

type Props = {};

type State = ISchoolData & {
  studentList: Array<IStudentData>;
  teacherList: Array<TeacherData>;
};

export default class AddSchool extends Component<Props, State> {
  students: IStudentData[] = [];
  addedStudents: IStudentData[] = [];
  addedTeachers: TeacherData[] = [];
  currentStudent = new IStudentData();
  currentTeacher = new TeacherData();
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.state = {
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
      .getAll()
      .then((response: any) => {
        this.setState({
          teacherList: response.data,
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
          studentList: response.data,
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
  // onChangeFunc(student: IStudentData) {
  //   console.log(student);
  //   this.setState({
  //     students: optionSelected,
  //   });
  // }

  onChangeFuncs(optionSelected: any) {
    console.log(optionSelected);
    this.setState({
      teacher: optionSelected,
    });
  }

  saveSchool = () => {
    const data: ISchoolData = {
      name: this.state.name,
      address: this.state.address,
      students: this.state.students,
      teacher: this.state.teacher,
    };

    schoolService
      .create(data)
      .then((response: any) => {
        this.setState({
          schoolid: response.data.schoolid,
          name: response.data.name,
          address: response.data.address,
          students: response.data.students,
          teacher: response.data.students,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  render() {
    const { name, address, studentList, teacherList } = this.state;

    return (
      <div className="submit-form">
        <div className="form-group">
          <h2>add form</h2>
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
          <Multiselect options={studentList} displayValue="name" />
          <br />
          <label htmlFor="address">Teacher</label>
          <Multiselect
            options={teacherList} // Options to display in the dropdown
            displayValue="name" // Property name to display in the dropdown options
            onSelect={this.onChangeFuncs}
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
