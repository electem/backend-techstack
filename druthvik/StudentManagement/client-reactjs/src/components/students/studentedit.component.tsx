import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IStudentData } from "../../types/student.types";
import studentService from "../../services/student.service";
interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentStudent: IStudentData;
};
export default class studentedit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.state = {
      currentStudent: {
        studentid: null,
        name: "",
        address: "",
        email: "",
        gender: "",
        dateofbirth: "",
      },
    };
  }
  componentDidMount() {
    this.getStudentById(this.props.match.params.id);
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
                <label htmlFor="description">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentStudent.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Address</label>
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
                  onChange={this.onChangeGender}
                />{" "}
                {currentStudent.gender}
              </label>
            </form>
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
