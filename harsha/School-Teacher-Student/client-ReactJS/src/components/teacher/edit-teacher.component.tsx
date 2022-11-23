import { ChangeEvent, Component } from "react";
import SchoolService from "../../services/school.service";
import TeacherService from "../../services/teacher.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { Teacher } from "../../types/teacher.type";
import { School } from "../../types/school.type";

interface RouterProps {
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State =  {
    currentTeacher: Teacher;
  schools:Array<School>
};

export default class EditTeacher extends Component<Props, State> {
  schoolList:School[]=[];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
    this.onChangeSchools = this.onChangeSchools.bind(this);
    this.getTeacher = this.getTeacher.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);

    this.state = {
        currentTeacher:{
      teacherName: "",
      address: "",
      gender: "",
      email: "",
      schools: [],
        },
        schools:[]
    };
  }

  componentDidMount() {
    this.getTeacher(this.props.match.params.id);
    this.retrieveSchools();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const teacherName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          teacherName: teacherName,
        },
      };
    });
  }

  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          address: address,
        },
      };
    });
  }

  onChangeGender(e: ChangeEvent<HTMLInputElement>) {
    const gender = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          gender: gender,
        },
      };
    });
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          email: email,
        },
      };
    });
  }

  onChangePhoneNo(e: ChangeEvent<HTMLInputElement>) {
    const phoneNo = e.target.valueAsNumber;

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          phoneNo: phoneNo,
        },
      };
    });
  }

  onChangeSchools(school: School) {
    const schools =this.state.schools?.concat(school)

    this.setState(function (prevState) {
      return {
        currentTeacher: {
          ...prevState.currentTeacher,
          schools: schools,
        },
      };
    });
  }

  onSelectPush(school:School){
    this.state.currentTeacher.schools?.push(school);
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
        this.schoolList = this.state.schools
        console.log(this.schoolList)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  getTeacher(id: string) {
    TeacherService.get(id)
      .then((response: any) => {
        this.setState({
            currentTeacher: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateTeacher() {
    TeacherService.update(
      this.state.currentTeacher,
      this.state.currentTeacher.teacherId
    )
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/teachers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentTeacher, schools } = this.state;

    return (
      <div className="edit-form">
        <h2>EDIT TEACHER</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={currentTeacher.teacherName}
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

          <div className="form-group">Select a Gender</div>
            <label >
              <input
                type="radio"
                name="gender"
                value={currentTeacher.gender}
                checked={currentTeacher.gender}
                onChange={this.onChangeGender}
              />
              {currentTeacher.gender}
            </label>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={currentTeacher.email}
              onChange={this.onChangeEmail}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNo">Phone No</label>
            <input
              type="number"
              className="form-control"
              id="phoneNo"
              required
              value={currentTeacher.phoneNo}
              onChange={this.onChangePhoneNo}
              name="phoneNo"
            />
          </div>

          <div className="form-group">
          <label >Current Schools</label>
          {currentTeacher.schools?.map((school, i) => (
            <div key={i}>
              <input
                type="checkbox"
                name="schools"
                checked={true}
                value={school.schoolName}
                onChange={()=>this.onChangeSchools}
              />{" "}
              {school.schoolName}
        </div>))}
        </div>

          <div className="form-group">
          <label >Schools</label>
          {schools.map((school, i) => (
            <div key={i}>
              <input
                type="checkbox"
                name="schoolList"
                value={school.schoolName}
                onChange={()=>this.onSelectPush(school)}
              />{" "}
              {school.schoolName}
            </div>
          ))}</div>

          <button
            onClick={this.updateTeacher}
            type="button"
            className="btn btn-success"
          >
            Update
          </button>
          <Link to="/teachers">
            <button type="button" className="btn btn-warning">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
