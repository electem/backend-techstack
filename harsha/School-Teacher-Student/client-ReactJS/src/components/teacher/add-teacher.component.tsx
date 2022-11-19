import { ChangeEvent, Component } from "react";
import SchoolService from "../../services/school.service";
import TeacherService from "../../services/teacher.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { Teacher } from "../../types/teacher.type";
import { School } from "../../types/school.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = Teacher & {
  schoolList?: Array<School>;
  submitted: boolean;
};

const genders = [{ value: "Male" }, { value: "Female" }];

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
      schools: [],
      submitted: false,
      schoolList: [],
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

  onChangeSchools(school: School) {
    this.setState({
      schools: this.state.schools?.concat(school),
    });
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response: any) => {
        this.setState({
          schoolList: response.data,
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
      phoneNo: this.state.phoneNo,
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
          phoneNo: response.state.phoneNo,
          schools: response.data.schools,
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
      this.props.history.push("/teachers");
  }

  render() {
    const { teacherName, address, email, phoneNo, schoolList } = this.state;

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
            <div className="form-group">Select a Gender</div>
            {genders.map((gender, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name="gender"
                  value={gender.value}
                  onChange={this.onChangeGender}
                />{" "}
                {gender.value}
              </label>
            ))}
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
              type="number"
              className="form-control"
              id="phoneNo"
              required
              value={phoneNo}
              onChange={this.onChangePhoneNo}
              name="phoneNo"
            />
          </div>

          <div className="form-group">
            <label>Schools</label>
            {schoolList?.map((school, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="schools"
                  value={school.schoolName}
                  onChange={() => this.onChangeSchools(school)}
                />{" "}
                {school.schoolName}
              </div>
            ))}
          </div>
          <br />

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
