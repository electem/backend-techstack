import { ChangeEvent, Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Student } from "../../types/student.type";
import SchoolService from "../../services/school.service";
import StudentService from "../../services/student.service";
import { School } from "../../types/school.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = Student & {
  schools: Array<School>;
  submitted: boolean;
};

const genders = [
  { value: "Male" },
  { value: "Female" },
];

export default class AddStudent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
    this.onChangeSchools = this.onChangeSchools.bind(this);
    this.saveStudent = this.saveStudent.bind(this);

    this.state = {
      studentName: "",
      address: "",
      gender: "",
      email: "",
      dateOfBirth:"",
      school: {
        schoolName:''
      },
      schools: [],
      submitted: false,
    };
  }

  componentDidMount() {
    this.retrieveSchools();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      studentName: e.target.value,
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

  onChangeDateOfBirth(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      dateOfBirth: e.target.value,
    });
  }

  onChangePhoneNo(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      phoneNo: e.target.valueAsNumber,
    });
  }

  onChangeSchools(event: Student) {
    this.setState({
      school: event.school,
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

  saveStudent() {
    const student: Student = {
      studentName: this.state.studentName,
      address: this.state.address,
      email: this.state.email,
      gender: this.state.gender,
      dateOfBirth: this.state.dateOfBirth,
      phoneNo: this.state.phoneNo,
      school: this.state.school,
    };

    StudentService.create(student)
      .then((response: any) => {
        this.setState({
          studentId: response.data.studentId,
          studentName: response.data.studentName,
          address: response.data.address,
          email: response.state.email,
          gender: response.state.gender,
          dateOfBirth: response.state.dateOfBirth,
          phoneNo: response.state.phoneNo,
          school: response.data.school,
          submitted: true,
        });
        this.props.history.push("/students");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { studentName, address, email, dateOfBirth, phoneNo, schools } =
      this.state;

    return (
      <div className="submit-form">
        <h2>ADD STUDENT</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={studentName}
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
          <br />

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
            <label htmlFor="date">DOB</label>
            <input
              type="date"
              className="form-control"
              required
              value={dateOfBirth}
              onChange={this.onChangeDateOfBirth}
              name="date"
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
            <select>
              <option value="">Select School</option>
              {schools.map((school) => (
                <option
                  key={school.schoolId}
                  typeof="checked"
                  value={school.schoolName}
                  onChange={()=>this.onChangeSchools(school)}
                >
                  {school.schoolName}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={this.saveStudent}
            type="button"
            className="btn btn-success"
          >
            Submit
          </button>
          <Link to="/students">
            <button type="button" className="btn btn-warning">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
