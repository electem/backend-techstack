/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/rules-of-hooks */
import { Component, ChangeEvent } from "react";
import schoolService from "../../services/school.service";
import studentService from "../../services/student.service";
import ISchoolData from "../../types/school.types";
import { IStudentData } from "../../types/student.types";
import * as React from "react";

type Props = {
  student?: IStudentData;
};
type State = IStudentData & {
  schools: Array<ISchoolData>;
  formErrors?: {};
  studentSchool?: {};
};
const genderList = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default class AddStudent extends Component<Props, State> {
  schools: ISchoolData[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangephonenumber = this.onChangephonenumber.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
    this.onChangedateofbirth = this.onChangedateofbirth.bind(this);

    this.state = {
      name: "",
      address: "",
      phonenumber: 0,
      email: "",
      gender: "",
      dateofbirth: "",
      schools: [],
      formErrors: {},
      studentSchool: {},
    };
  }

  onFormValidation() {
    const { name, address, phonenumber, email, dateofbirth } = this.state;
    let formErrors: any = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      formErrors["nameErr"] = "Name is required.";
    }
    if (!address) {
      formIsValid = false;
      formErrors["addressErr"] = "Address is required.";
    }
    if (!phonenumber) {
      formIsValid = false;
      formErrors["phonenumberErr"] = "Address is required.";
    }
    if (!email) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Email id is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Invalid email id.";
    }
    if (!dateofbirth) {
      formIsValid = false;
      formErrors["dobErr"] = "DOB is required.";
    } else {
      var pattern =
        /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
      if (!pattern.test(dateofbirth)) {
        formIsValid = false;
        formErrors["dobErr"] = "Invalid date of birth";
      }
    }
    this.setState({ formErrors: formErrors });
    return formIsValid;
  }
  onSubmit = (e: any) => {
    e.preventDefault();

    if (this.onFormValidation()) {
      alert("You have been successfully submitted.");
      this.setState(this.state);
    }
  };

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
      .getAll()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
        console.log(response.data);
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

  onChangeDropDown(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      studentSchool: e.target.value,
    });
  }

  handleSelectChange(event: any) {
    var selectElement = event.target;
    var value = selectElement.value;
    console.log(value);
  }

  saveStudent = () => {
    const data: IStudentData = {
      name: this.state.name,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      gender: this.state.gender,
      dateofbirth: this.state.dateofbirth,
    };

    studentService
      .create(data)
      .then((response: any) => {
        this.setState({
          studentid: response.data.studentid,
          name: response.data.name,
          address: response.data.address,
          phonenumber: response.data.phonenumber,
          email: response.data.email,
          gender: response.data.gender,
          dateofbirth: response.data.dateofbirth,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  render() {
    const { name, address, phonenumber, email, dateofbirth, schools } =
      this.state;
    // const { nameErr, addressErr, phonenumberErr, emailIdErr, dobErr } =
    //   this.state.formErrors;

    return (
      <div className="submit-form">
        <div>
          <form onSubmit={this.onSubmit}>
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
            {/* <div className="form-group">
            <label htmlFor="name">Gender</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={gender}
              onChange={this.onChangegender}
              name="name"
            />
          </div> */}
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
            <label>School</label>
            <div className="form-group">
              <select>
                <option value="">Select</option>
                {schools.map((options) => (
                  <option
                    key={options.schoolid}
                    value={options.name}
                    onChange={(e: ChangeEvent<HTMLOptionElement>) => {
                      return console.info(e.target.value);
                    }}
                  >
                    {options.name}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
