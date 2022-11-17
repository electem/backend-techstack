import Multiselect from "multiselect-react-dropdown";
import { Component, ChangeEvent, useState } from "react";
import { Link, RouteComponentProps, useParams } from "react-router-dom";
import SchoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentSchool: ISchoolData;
  message: string;
};
export default class EditSchool extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.state = {
      currentSchool: {
        schoolid: null,
        name: "",
        address: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    this.setState(function (prevState) {
      return {
        currentSchool: {
          ...prevState.currentSchool,
          name: name,
        },
      };
    });
  }
  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value;
    this.setState((prevState) => ({
      currentSchool: {
        ...prevState.currentSchool,
        address: address,
      },
    }));
  }
  getTutorial(id: string) {
    SchoolService.get(id)
      .then((response: any) => {
        this.setState({
          currentSchool: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updatePublished(status: boolean) {
    const data: ISchoolData = {
      schoolid: this.state.currentSchool.schoolid,
      name: this.state.currentSchool.name,
    };
    SchoolService.update(data, this.state.currentSchool.schoolid)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentSchool: {
            ...prevState.currentSchool,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateTutorial() {
    SchoolService.update(
      this.state.currentSchool,
      this.state.currentSchool.schoolid
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentSchool } = this.state;
    return (
      <>
        <h4>EDIT SCHOOL</h4>
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="schoolName">Name</label>
              <input
                type="text"
                className="form-control"
                id="schoolName"
                value={currentSchool.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={currentSchool.address}
                onChange={this.onChangeAddress}
              />
            </div>
          </form>
          <button type="submit" className="btn badge-success">
            Update
          </button>
          <Link to={"/schools"}>
            <button type="submit" className="btn badge-warning">
              Cancel
            </button>
          </Link>
        </div>
      </>
    );
  }
}
