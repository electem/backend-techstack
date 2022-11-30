/* eslint-disable no-labels */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-labels */
import { Component, ChangeEvent } from "react";
import teacherService from "../../services/teacher.service";
import { TeacherData } from "../../types/teacher.types";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
import { Link } from "react-router-dom";

type Props = {
  teacher?: TeacherData;
};
type State = TeacherData & {
  schools?: Array<ISchoolData>;
};

const genderList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export default class AddTeacher extends Component<Props, State> {
  currentSchool = {} as ISchoolData;
  addedSchool: ISchoolData[] = [];
  schools: ISchoolData[] = [];
  onchooseoption: {} = {};
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangephonenumber = this.onChangephonenumber.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
    this.pushSelectedSchool = this.pushSelectedSchool.bind(this.currentSchool);
    this.state = {
      teacherid: 0,
      name: "",
      address: "",
      email: "",
      gender: "",
      school: [],
    };
    schools: [];
  }
  componentDidMount() {
    this.retrieveSchools();
  }

  retrieveSchools() {
    schoolService
      .getAllSchools()
      .then((response) => {
        this.setState({
          schools: response.data,
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

  onChangephonenumber(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      phonenumber: e.target.valueAsNumber,
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      address: e.target.value,
    });
  }

  pushSelectedSchool(school = {} as ISchoolData) {
    this.addedSchool.push(school);
    console.log(this.addedSchool);
  }
  onChangeSchools(schools: ISchoolData) {
    this.setState({
      school: this.state.school?.concat(schools),
    });
  }

  onChangeemail(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangegender(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      gender: e.target.value,
    });
  }

  saveTeacher = () => {
    const teacher: TeacherData = {
      teacherid: this.state.teacherid,
      name: this.state.name,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      gender: this.state.gender,
      school: this.state.school,
    };

    teacherService
      .createTeacher(teacher)
      .then((response) => {
        this.setState({
          name: response.data.name,
          address: response.data.address,
          phonenumber: response.data.phonenumber,
          email: response.data.email,
          gender: response.data.gender,
          school: response.data.school,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  render() {
    const { name, address, phonenumber, email, schools } = this.state;

    return (
      <div className="container">
        <div className="col-md-4 offset-md-4">
          <h2>Add Teacher</h2>
          <div className="card mb-4">
            <div className="card-body">
              <form>
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
                  <div className="form-group">
                    <label htmlFor="phonenumber">Phonenumber</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phonenumber"
                      required
                      value={phonenumber}
                      onChange={this.onChangephonenumber}
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
                      value={email}
                      onChange={this.onChangeemail}
                      name="name"
                    />
                  </div>
                  <div className="title">
                    <label htmlFor="name">Gender</label>
                    {genderList.map((x, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name="gender"
                          value={x.value}
                          onChange={this.onChangegender}
                        />{" "}
                        {x.label}
                      </label>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>Schools</label>

                    {schools?.map((school, i) => (
                      <div key={i}>
                        <input
                          type="checkbox"
                          name="schools"
                          onChange={() => this.onChangeSchools(school)}
                        />{" "}
                        {school.name}
                      </div>
                    ))}
                  </div>
                  <Link to={"/teacherlist"}>
                    <button
                      onClick={this.saveTeacher}
                      className="btn btn-success"
                    >
                      Create
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}