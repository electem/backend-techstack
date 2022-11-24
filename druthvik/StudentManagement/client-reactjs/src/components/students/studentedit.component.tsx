import { Component, ChangeEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { IStudentData } from "../../types/student.types";
import studentService from "../../services/student.service";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentStudent: IStudentData;
  school?: Array<ISchoolData>;
};

export default class studentedit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
    this.state = {
      currentStudent: {
        studentid: null,
        name: "",
        address: "",
        email: "",
        gender: "",
        dateofbirth: "",
      },
      school: [],
    };
  }
  componentDidMount() {
    this.getStudentById(this.props.match.params.id);
    this.retrieveSchools();
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        name: name,
      },
    }));
  }
  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value;

    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        address: address,
      },
    }));
  }
  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        email: email,
      },
    }));
  }
  onChangeGender(e: ChangeEvent<HTMLInputElement>) {
    const gender = e.target.value;

    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        gender: gender,
      },
    }));
  }
  onChangeDateOfBirth(e: ChangeEvent<HTMLInputElement>) {
    const dateofbirth = e.target.value;

    this.setState((prevState) => ({
      currentStudent: {
        ...prevState.currentStudent,
        dateofbirth: dateofbirth,
      },
    }));
  }

  getStudentById(id: string) {
    studentService
      .get(id)
      .then((response: any) => {
        this.setState({
          currentStudent: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  retrieveSchools() {
    schoolService
      .getAll()
      .then((response: any) => {
        this.setState({
          school: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateStudents() {
    studentService
      .update(this.state.currentStudent, this.state.currentStudent.studentid)
      .then((response: any) => {
        console.log(response.data);
        this.setState((prevState) => ({
          currentStudent: {
            ...prevState.currentStudent,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { currentStudent } = this.state;

    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Student</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentStudent.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentStudent.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentStudent.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="title">Select gender from the list</div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value={currentStudent.gender}
                  checked={currentStudent.gender}
                  onChange={this.onChangeGender}
                />{" "}
                {currentStudent.gender}
              </label>
              <div className="form-group">
                <label htmlFor="date">DOB</label>

                <input
                  type="date"
                  className="form-control"
                  value={currentStudent.dateofbirth}
                  onChange={this.onChangeDateOfBirth}
                  name="date"
                />
              </div>
              <div className="form-group">
                <select>
                  <option
                    key={currentStudent.school?.schoolid}
                    value={currentStudent.school?.name}
                  >
                    {currentStudent.school?.name}
                  </option>
                </select>
              </div>
            </form>
            <Link to={"/studentlist"}>
              <button
                onClick={this.updateStudents}
                type="submit"
                className="btn badge-success"
              >
                Update
              </button>

              <button type="submit" className="btn badge-warning">
                Cancel
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    );
  }
}
