import { ChangeEvent, Component } from "react";
import SchoolService from "../services/school.service";
import TeacherService from "../services/teacher.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { Teacher } from "../types/teacher.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = Teacher & {
  submitted: boolean;
};

export default class AddTeacher extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
    this.onChangeSchools = this.onChangeSchools.bind(this);
    this.saveTeacher = this.saveTeacher.bind(this);

    this.state = {
      teacherName: "",
      address: "",
      gender: "",
      email: "",
      phoneNo: 0,
      schools: [],
      submitted: false,
    };
  }

  componentDidMount() {
    this.retrieveSchools();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      teacherName: e.target.value,
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeGender(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePhoneNo(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      phoneNo: e.target.valueAsNumber,
    });
  }

  onChangeSchools(event: any) {
    this.setState({
      schools: event.target.value,
    });
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  saveTeacher() {
    const teacher: Teacher = {
      teacherName: this.state.teacherName,
      address: this.state.address,
      email: this.state.email,
      gender: this.state.gender,
      schools: this.state.schools,
    };

    TeacherService.create(teacher)
      .then((response: any) => {
        this.setState({
          teacherId: response.data.teacherId,
          teacherName: response.data.teacherName,
          address: response.data.address,
          email: response.state.email,
          gender: response.state.gender,
          schools: response.data.schools,
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { teacherName, address, gender, email, phoneNo } = this.state;

    return (
      <div className="submit-form">
        <h2>ADD TEACHER</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={teacherName}
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
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              required
              value={gender}
              onChange={this.onChangeGender}
              name="gender"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={this.onChangeEmail}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNo">Phone No</label>
            <input
              type="text"
              className="form-control"
              id="phoneNo"
              required
              value={phoneNo}
              onChange={this.onChangePhoneNo}
              name="phoneNo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="schools">Schools</label>
            <input
              type="checkbox"
              name="schools"
              className="form-control"
              value="schools"
            />
          </div>

          <button
            onClick={this.saveTeacher}
            type="button"
            className="btn btn-success"
          >
            Submit
          </button>
          <Link to="/teachers">
            <button type="button" className="btn btn-warning">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
