/* eslint-disable react/require-render-return */
import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import schoolService from "../../services/school.service";
import teacherService from "../../services/teacher.service";
import ISchoolData from "../../types/school.types";
import { TeacherData } from "../../types/teacher.types";

interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;

type State = {
  currentTeacher: TeacherData;
  school?: Array<ISchoolData>;
};
const genderList = [{ value: "Male" }, { value: "Female" }];

export default class EditTeacher extends Component<Props, State> {
  school: ISchoolData[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.state = {
      currentTeacher: {
        teacherid: null,
        name: "",
        address: "",
        email: "",
        gender: "",
      },
      school: [],
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

  componentDidMount() {
    this.getTeacher(this.props.match.params.id);
    this.retrieveSchools();
  }
  getTeacher(id: string) {
    teacherService
      .get(id)
      .then((response: any) => {
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
      .update(this.state.currentTeacher, this.state.currentTeacher.teacherid)
      .then((response: any) => {
        console.log(response.data);
        this.setState((prevState) => ({
          currentTeacher: {
            ...prevState.currentTeacher,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentTeacher, school } = this.state;
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
            {genderList.map((x, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name="gender"
                  value={currentTeacher.gender}
                  onChange={this.onChangeGender}
                />{" "}
                {x.value}
              </label>
            ))}
          </div>
          <div className="form-group">
            <label>Current Schools</label>

            {currentTeacher.school?.map((school, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="schools"
                  checked={true}
                  value={school.name}
                />{" "}
                {school.name}
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Schools</label>
            {school?.map((school, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="schools"
                  value={currentTeacher.school}
                />{" "}
                {school.name}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="badge badge-success"
            onClick={this.updateTeacher}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}
