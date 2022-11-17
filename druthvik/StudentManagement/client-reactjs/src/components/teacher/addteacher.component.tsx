import { Component, ChangeEvent } from "react";
import teacherService from "../../services/teacher.service";
import { TeacherData } from "../../types/teacher.types";
import ISchoolData from "../../types/school.types";
import schoolService from "../../services/school.service";

type Props = {
  teacher?: TeacherData;
};
type State = TeacherData & {
  schools: Array<ISchoolData>;
};
const genderList = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export default class AddTeacher extends Component<Props, State> {
  schools: ISchoolData[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangephonenumber = this.onChangephonenumber.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
    this.state = {
      name: "",
      address: "",
      email: "",
      gender: "",
      schools: [],
    };
  }
  componentDidMount() {
    this.retrieveSchools();
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
    const data: TeacherData = {
      name: this.state.name,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      gender: this.state.gender,
    };

    teacherService
      .create(data)
      .then((response: any) => {
        this.setState({
          name: response.data.name,
          address: response.data.address,
          phonenumber: response.data.phonenumber,
          email: response.data.email,
          gender: response.data.gender,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  render() {
    const { name, address, phonenumber, email, gender, schools } = this.state;

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
          <div className="form-group">
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
          <button onClick={this.saveTeacher} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
