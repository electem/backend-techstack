/* eslint-disable react/require-render-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ChangeEvent } from "react";
import schoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";

type Props = {};

type State = ISchoolData & {
  submitted: boolean;
};
type UserSubmitForm = {
  name: string;
  address: string;
};

export default class AddSchool extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.state = {
      schoolid: null,
      name: "",
      address: "",
      submitted: false,
    };
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      address: e.target.value,
    });
  }
  saveSchool = () => {
    const data: ISchoolData = {
      name: this.state.name,
      address: this.state.address,
    };

    schoolService
      .create(data)
      .then((response: any) => {
        this.setState({
          schoolid: response.data.schoolid,
          name: response.data.name,
          address: response.data.address,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  newSchool = () => {
    this.setState({
      schoolid: null,
      name: "",
      address: "",
      submitted: false,
    });
  };
  render() {
    const { submitted, name, address } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSchool}>
              Add
            </button>
          </div>
        ) : (
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

            <button onClick={this.saveSchool} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
