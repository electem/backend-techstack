import { ChangeEvent, Component } from "react";
import SchoolService from "../../services/school.service";
import TeacherService from "../../services/teacher.service";
import StudentService from "../../services/student.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { School } from "../../types/school.type";
import Multiselect from "multiselect-react-dropdown";
import { Teacher } from "../../types/teacher.type";
import { Student } from "../../types/student.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = School & {
  submitted: boolean;
  teachersList: Array<Teacher>;
  studentsList: Array<Student>;
};

export default class AddSchool extends Component<Props, State> {
  addedTeachers:Teacher[]=[];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeTeachers = this.onChangeTeachers.bind(this);
    this.onChangeStudents = this.onChangeStudents.bind(this);
    this.saveSchool = this.saveSchool.bind(this);

    this.state = {
      schoolName: "",
      address: "",
      submitted: false,
      teachersList:[],
      studentsList:[],
    };
  }

  componentDidMount() {
    this.retrieveTeachers();
    this.retrieveStudents();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      schoolName: e.target.value,
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeTeachers(e: any) {
    this.addedTeachers.push(e[0])    
    this.setState({
      teachers: this.addedTeachers,
    });
  }

  onChangeStudents(student: School) {
    this.setState({
      students: this.state.students?.concat(student),
    });
  }

  retrieveTeachers() {
    TeacherService.getTeachers()
      .then((response: any) => {
        this.setState({
          teachersList: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  retrieveStudents() {
    StudentService.getStudents()
      .then((response: any) => {
        this.setState({
          studentsList: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  saveSchool() {
    const school: School = {
      schoolName: this.state.schoolName,
      address: this.state.address,
      teachers: this.state.teachers,
      students: this.state.students,
    };

    SchoolService.create(school)
      .then((response: any) => {
        this.setState({
          schoolId: response.data.schoolId,
          schoolName: response.data.schoolName,
          address: response.data.address,
          teachers: response.state.teachers,
          students: response.state.students,
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
      this.props.history.push("/schools");
  }

  render() {
    const { schoolName, address, teachersList, studentsList } = this.state;

    return (
      <div className="submit-form">
        <h2>ADD SCHOOL</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={schoolName}
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

          <div className="form-group">
            <Multiselect
              options={teachersList}
              closeIcon="close"
              placeholder="Choose Teachers"
              displayValue="teacherName"
              onSelect={this.onChangeTeachers }
            />
          </div>

          <div className="form-group">
            <Multiselect
              options={studentsList}
              closeIcon="close"
              placeholder="Choose Students"
              displayValue="studentName"
              onSelect={(event) =>this.onChangeStudents(event)}
            />
          </div>

          <button
            onClick={this.saveSchool}
            type="button"
            className="btn btn-success"
          >
            Submit
          </button>
          <Link to="/schools">
            <button type="button" className="btn btn-warning">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
