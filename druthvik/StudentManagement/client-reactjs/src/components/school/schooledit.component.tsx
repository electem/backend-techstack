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
    this.getSchoolById = this.getSchoolById.bind(this);
    this.updateSchool = this.updateSchool.bind(this);
    this.state = {
      currentSchool: {
        schoolid: 0,
        name: "",
        address: "",
      },
      teachers: [],
      students: [],
      message: "",
    };
  }
  componentDidMount() {
    this.getSchoolById(this.props.match.params.id);
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
  getSchoolById(id: string) {
    SchoolService.getSchoolById(id)
      .then((response) => {
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
    SchoolService.updateStudent(
      this.state.currentSchool,
      this.state.currentSchool.schoolid
    )
      .then((response) => {
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
        <div className="container">
          <div className="col-md-4 offset-md-4">
            <h4>EDIT SCHOOL</h4>
            <div className="card mb-4">
              <div className="card-body">
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

                    <button
                      type="submit"
                      className="btn badge-warning marignleftstudent"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
