/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-render-return */
import { Component, ChangeEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import schoolService from "../../services/school.service";
import teacherService from "../../services/teacher.service";
import ISchoolData from "../../types/school.types";
import { TeacherData } from "../../types/teacher.types";

interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;

type State = {
  currentTeacher: TeacherData;
  schools: Array<ISchoolData>;
};

export default class EditTeacher extends Component<Props, State> {
  schools: ISchoolData[] = [];
  currentTeacher = {} as TeacherData;
  currentSchool = {} as ISchoolData;
  removeSchool = {} as ISchoolData;
  value: number[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
    this.removeSchoolInSchoolList = this.removeSchoolInSchoolList.bind(this);
    this.removeSelectedSchoolFromTeacher =
      this.removeSelectedSchoolFromTeacher.bind(this);
    this.state = {
      currentTeacher: {
        teacherid: 0,
        name: "",
        address: "",
        email: "",
        gender: "",
      },
      schools: [],
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        name: name,
      },
    }));
  }
  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value;
    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        address: address,
      },
    }));
  }
  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        email: email,
      },
    }));
  }
  onChangeGender(e: ChangeEvent<HTMLInputElement>) {
    const gender = e.target.value;
    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        gender: gender,
      },
    }));
  }
  onChangePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
    const phonenumber = e.target.valueAsNumber;
    this.setState((prevState) => ({
      currentTeacher: {
        ...prevState.currentTeacher,
        phonenumber: phonenumber,
      },
    }));
  }
  retrieveSchools() {
    schoolService
      .getAllSchools()
      .then((response) => {
        this.setState({
          schools: response.data,
        });
        this.schools = this.state.schools;
        console.log(this.schools);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getTeacher(this.props.match.params.id);
    this.retrieveSchools();
  }
  getTeacher(id: string) {
    teacherService
      .getTeacherById(id)
      .then((response) => {
        this.setState({
          currentTeacher: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateTeacher() {
    teacherService
      .updateTeacher(
        this.state.currentTeacher,
        this.state.currentTeacher.teacherid
      )
      .then((response) => {
        console.log(response.data);
        this.setState((prevState) => ({
          currentTeacher: {
            ...prevState.currentTeacher,
          },
          schools: {
            ...prevState.schools,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  removeSchoolInSchoolList(school: ISchoolData) {
    this.currentSchool = school;
    this.state.currentTeacher.school?.push(this.currentSchool);
    this.state.schools.splice(
      this.state.schools.indexOf(this.currentSchool),
      1
    );
  }
  async removeSelectedSchoolFromTeacher(school: ISchoolData): Promise<void> {
    this.removeSchool = school;
    this.state.schools.push(this.removeSchool);
    this.state.currentTeacher.school?.splice(
      this.state.currentTeacher.school?.indexOf(this.removeSchool),
      1
    );
  }
  handleChecked(e: any) {
    console.log(e.target.checked);
  }

  render() {
    const { currentTeacher, schools } = this.state;
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
              value={currentTeacher.name}
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
              value={currentTeacher.address}
              onChange={this.onChangeAddress}
              name="address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phonenumber</label>
            <input
              type="number"
              className="form-control"
              id="phonenumber"
              required
              value={currentTeacher.phonenumber}
              onChange={this.onChangePhoneNumber}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={currentTeacher.email}
              onChange={this.onChangeEmail}
              name="name"
            />
          </div>
          <div className="title">
            <label htmlFor="name">Gender</label>
            <input
              type="radio"
              name="gender"
              checked
              value={currentTeacher.gender}
              defaultChecked
              onChange={this.onChangeGender}
            />{" "}
            {currentTeacher.gender}
          </div>

          <div className="form-group">
            <label>Current Schools</label>
            {currentTeacher.school?.map((school, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="schools"
                  value={school.name}
                  checked
                  onChange={this.handleChecked}
                />{" "}
                {school.name}
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Schools</label>
            {schools?.map((school, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="schools"
                  onChange={() => this.removeSchoolInSchoolList(school)}
                />{" "}
                {school.name}
              </div>
            ))}
          </div>

          <Link to={"/teacherlist"}>
            <button
              onClick={this.updateTeacher}
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
      </div>
    );
  }
}
