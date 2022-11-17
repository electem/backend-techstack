import { Component, ChangeEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import SchoolService from "../services/school.service";
import { School } from "../types/school.type";

interface RouterProps {
  // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentSchool: School;
};

export default class EditSchool extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getSchool = this.getSchool.bind(this);
    this.updateSchool = this.updateSchool.bind(this);

    this.state = {
      currentSchool: {
        schoolId: null,
        schoolName: "",
        address: "",
      },
    };
  }

  componentDidMount() {
    this.getSchool(this.props.match.params.id);
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const schoolName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSchool: {
          ...prevState.currentSchool,
          schoolName: schoolName,
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

  getSchool(id: string) {
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

  updateSchool() {
    SchoolService.update(
      this.state.currentSchool,
      this.state.currentSchool.schoolId
    )
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/schools");
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
                value={currentSchool.schoolName}
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

          <button
            type="submit"
            className="btn badge-success"
            onClick={this.updateSchool}
          >
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
