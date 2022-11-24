/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/rules-of-hooks */
import { Component, ChangeEvent } from "react";
import schoolService from "../../services/school.service";
import studentService from "../../services/student.service";
import ISchoolData from "../../types/school.types";
import { IStudentData } from "../../types/student.types";
import http from "../../http-common";
import { Link } from "react-router-dom";
type Props = {
  student?: IStudentData;
};
type State = IStudentData & {
  schools: Array<ISchoolData>;
  formErrors?: {};
  studentSchool?: {};
  selectedFiles: "";
};
const genderList = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default class AddStudent extends Component<Props, State> {
  schools: ISchoolData[] = [];
  currentSchool = {} as ISchoolData;
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangephonenumber = this.onChangephonenumber.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
    this.onChangedateofbirth = this.onChangedateofbirth.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.state = {
      studentid: 0,
      name: "",
      address: "",
      phonenumber: 0,
      email: "",
      gender: "",
      dateofbirth: "",
      schools: [],
      formErrors: {},
      studentSchool: {},
      selectedFiles: "",
    };
  }

  componentDidMount() {
    this.retrieveSchools();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }
  retrieveSchools() {
    schoolService
      .getAllSchools()
      .then((response) => {
        this.setState({
          schools: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
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
  onChangedateofbirth(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      dateofbirth: e.target.value,
    });
  }

  onSchoolSelect(event: ChangeEvent<HTMLSelectElement>) {
    const src = event.target.value;
    const schoolNames = this.state.schools.filter((s) => s.name === src);
    this.currentSchool = schoolNames[0];
    console.log(schoolNames);
    this.setState({
      school: this.currentSchool,
    });
  }

  saveStudent = () => {
    const data: IStudentData = {
      studentid: this.state.studentid,
      name: this.state.name,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      gender: this.state.gender,
      dateofbirth: this.state.dateofbirth,
      school: this.state.school,
    };

    studentService
      .createStudents(data)
      .then((response) => {
        this.setState({
          studentid: response.data.studentid,
          name: response.data.name,
          address: response.data.address,
          phonenumber: response.data.phonenumber,
          email: response.data.email,
          gender: response.data.gender,
          dateofbirth: response.data.dateofbirth,
          school: response.data.school,
        });
        console.log(response.data);
        const formData = new FormData();
        formData.append("file", this.state.selectedFiles);
        http.post("/file", formData, {}).then((res) => {
          console.log(res);
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  onFileChange(e: { target: { files: any[] } }) {
    this.setState({ selectedFiles: e.target.files[0] });
  }

  render() {
    const { name, address, phonenumber, email, dateofbirth, schools } =
      this.state;

    return (
      <div className="container">
        <div className="col-md-4 offset-md-4">
          <h2>Add Student</h2>
          <div className="card mb-4">
            <div className="card-body">
              <form>
                <div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
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

                  <div className="title">Select gender from the list</div>
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
                  <div className="form-group">
                    <label htmlFor="name">Dob</label>
                    <input
                      type="date"
                      className="form-control"
                      id="name"
                      required
                      value={dateofbirth}
                      onChange={this.onChangedateofbirth}
                      name="name"
                    />
                  </div>
                  <label className="btn btn-default">
                    <input type="file" onChange={() => this.onFileChange} />
                  </label>

                  <label>School</label>
                  <div className="form-group">
                    <select onChange={(event) => this.onSchoolSelect(event)}>
                      <option value="">Select</option>
                      {schools.map((options) => (
                        <option key={options.schoolid} value={options.name}>
                          {options.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={this.saveStudent}
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                  <Link
                    to={"/studentlist"}
                    className="btn btn-secondary marignleftstudent"
                  >
                    Cancel
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
