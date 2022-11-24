import Multiselect from "multiselect-react-dropdown";
import { Component, ChangeEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import SchoolService from "../../services/school.service";
import ISchoolData from "../../types/school.types";
import { TeacherData } from "../../types/teacher.types";
import { IStudentData } from "../../types/student.types";
interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentSchool: ISchoolData;
  teachers: Array<TeacherData>;
  students: Array<IStudentData>;
  message: string;
};
export default class EditSchool extends Component<Props, State> {
  teachers: TeacherData[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    this.updateSchool = this.updateSchool.bind(this);
    this.state = {
      currentSchool: {
        schoolid: null,
        name: "",
        address: "",
      },
      teachers: [],
      students: [],
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
  // updatePublished(status: boolean) {
  //   const data: ISchoolData = {
  //     schoolid: this.state.currentSchool.schoolid,
  //     name: this.state.currentSchool.name,
  //   };
  //   SchoolService.update(data, this.state.currentSchool.schoolid)
  //     .then((response: any) => {
  //       this.setState((prevState) => ({
  //         currentSchool: {
  //           ...prevState.currentSchool,
  //           published: status,
  //         },
  //         message: "The status was updated successfully!",
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // }
  updateSchool() {
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
    const { currentSchool, teachers, students } = this.state;
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
            <div className="form-group">
              <label>Teachers</label>

              <Multiselect
                options={teachers}
                selectedValues={currentSchool.teacher}
                closeIcon="close"
                placeholder="Choose Teachers"
                displayValue="name"
              />
            </div>
            <div className="form-group">
              <label>Students</label>

              <Multiselect
                options={students}
                selectedValues={currentSchool.students}
                closeIcon="close"
                placeholder="Choose School"
                displayValue="name"
              />
            </div>
          </form>
          <Link to={"/schools"}>
            <button
              onClick={this.updateSchool}
              type="submit"
              className="btn badge-success"
            >
              Update
            </button>

            <button type="submit" className="btn badge-warning">
              Cancel
            </button>
          </Link>
        </div>
      </>
    );
  }
}
