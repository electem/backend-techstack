import { ChangeEvent, Component } from "react";
import SchoolService from "../services/school.service";
import TeacherService from "../services/teacher.service";
import StudentService from "../services/student.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { School } from "../types/school.type";
import Multiselect from "multiselect-react-dropdown";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = School & {
  submitted: boolean;
};

export default class AddSchool extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.saveSchool = this.saveSchool.bind(this);

    this.state = {
      schoolName: "",
      address: "",
      submitted: false,
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

  saveSchool() {
    const school: School = {
      schoolName: this.state.schoolName,
      address: this.state.address,
    };

    SchoolService.create(school)
      .then((response: any) => {
        this.setState({
          schoolId: response.data.schoolId,
          schoolName: response.data.schoolName,
          address: response.data.address,
          submitted: true,
        });
        this.props.history.push("/schools");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { schoolName, address, teachers, students } = this.state;

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
              options={teachers}
              closeIcon="close"
              placeholder="Choose Teachers"
              displayValue="teacherName"
            />
          </div>

          <div className="form-group">
            <Multiselect
              options={students}
              closeIcon="close"
              placeholder="Choose Students"
              displayValue="studentName"
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
