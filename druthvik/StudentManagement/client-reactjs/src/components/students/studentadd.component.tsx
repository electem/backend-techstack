/* eslint-disable react-hooks/rules-of-hooks */
import { Component, ChangeEvent } from "react";
import schoolService from "../../services/school.service";
import studentService from "../../services/student.service";
import ISchoolData from "../../types/school.types";
import { IStudentData } from "../../types/student.types";
import * as Yup from "yup";

type Props = {
  student?: IStudentData;
};
type State = IStudentData & {
  schools: Array<ISchoolData>;
  fields: {};
  errors: {};
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
      fields: {},
      errors: {},
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
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Fullname is required"),
      address: Yup.string().required("Fullname is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      phonenumber: Yup.string().required("Fullname is required"),
      dateofbirth: Yup.string().required("Fullname is required"),
    });
    const onSubmit = (data: State) => {
      console.log(JSON.stringify(data, null, 2));
    };

    const { name, address, phonenumber, email, dateofbirth, schools } =
      this.state;

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
          <div className="form-group">
            <select>
              <option value="">Select</option>
              {schools.map((options) => (
                <option key={options.schoolid} value={options.name}>
                  {options.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={this.saveStudent} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
