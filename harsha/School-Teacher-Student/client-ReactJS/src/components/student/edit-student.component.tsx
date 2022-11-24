import { ChangeEvent, Component } from "react";
import SchoolService from "../../services/school.service";
import StudentService from "../../services/student.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { School } from "../../types/school.type";
import { Student } from "../../types/student.type";

interface RouterProps {
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentStudent: Student;
  schools: Array<School>;
};

export default class EditStudent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
    this.onChangeSchools = this.onChangeSchools.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);

    this.state = {
      currentStudent: {
        studentName: "",
        address: "",
        gender: "",
        email: "",
        school: {
          schoolName: "",
        },
      },
      schools: [],
    };
  }

  componentDidMount() {
    this.getStudent(this.props.match.params.id);
    this.retrieveSchools();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const teacherName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          teacherName: teacherName,
        },
      };
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          address: address,
        },
      };
    });
  }

  onChangeGender(e: ChangeEvent<HTMLInputElement>) {
    const gender = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          gender: gender,
        },
      };
    });
  }

  onChangeDateOfBirth(e: ChangeEvent<HTMLInputElement>) {
    const dateOfBirth = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          dateOfBirth: dateOfBirth,
        },
      };
    });
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          email: email,
        },
      };
    });
  }

  onChangePhoneNo(e: ChangeEvent<HTMLInputElement>) {
    const phoneNo = e.target.valueAsNumber;

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          phoneNo: phoneNo,
        },
      };
    });
  }

  onChangeSchools(event: Event) {
    const schools = (event.target as HTMLInputElement).value

    this.setState(function (prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          schools: schools,
        },
      };
    });
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response) => {
        this.setState({
          schools: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  getStudent(id: string) {
    StudentService.get(id)
      .then((response) => {
        this.setState({
          currentStudent: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateStudent() {
    StudentService.update(
      this.state.currentStudent,
      this.state.currentStudent.studentId!
    )
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/teachers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentStudent } = this.state;

    return (
      <div className="edit-form">
        <h2>EDIT STUDENT</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={currentStudent.studentName}
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
              value={currentStudent.address}
              onChange={this.onChangeAddress}
              name="address"
            />
          </div>

          <div className="form-group">Select a Gender</div>
          <label>
            <input
              type="radio"
              name="gender"
              value={currentStudent.gender}
              checked={currentStudent.gender}
              onChange={this.onChangeGender}
            />
            {currentStudent.gender}
          </label>

          <div className="form-group">
            <label htmlFor="date">DOB</label>
            <input
              type="date"
              className="form-control"
              value={currentStudent.dateOfBirth}
              onChange={this.onChangeDateOfBirth}
              name="date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={currentStudent.email}
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
              value={currentStudent.phoneNo}
              onChange={this.onChangePhoneNo}
              name="phoneNo"
            />
          </div>

          <div className="form-group">
            <select>
              <option value="">Select School</option>
              <option
                typeof="checked"
                selected={true}
                value={currentStudent.school?.schoolName}
                onChange={()=>this.onChangeSchools}
              >
                {currentStudent.school?.schoolName}
              </option>
            </select>
          </div>

          <button
            onClick={this.updateStudent}
            type="button"
            className="btn btn-success"
          >
            Update
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
