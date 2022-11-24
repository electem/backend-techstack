import { ChangeEvent, Component } from "react";
import SchoolService from "../../services/school.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { School } from "../../types/school.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = {
  schools: Array<School>;
  searchName: string;
};

export default class SchoolsList extends Component<Props, State> {
  schoolsList: School[] = [];
  constructor(props: Props) {
    super(props);
    this.retrieveSchools = this.retrieveSchools.bind(this);
    this.deleteSchool = this.deleteSchool.bind(this);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);

    this.state = {
      schools: [],
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveSchools();
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response) => {
        this.setState({
          schools: response.data,
        });
        this.schoolsList = response.data;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteSchool(id: number) {
    SchoolService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/schools");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchName: e.target.value,
    });
  }

  retriveSearchedSchools(value: string) {
    this.setState({
      schools: this.schoolsList.filter((school) => {
        return school.schoolName?.includes(value);
      }),
    });
  }

  render() {
    const { schools, searchName } = this.state;

    return (
      <>
        <div className="panel">
          <div className="panel-heading">
            <div className="panel-body table-responsive">
              <div className="list1 row">
                <input
                  type="text"
                  className="form-control search"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={this.onChangeSearchName}
                />
                <div>
                  <button
                    onClick={() => this.retriveSearchedSchools(searchName)}
                    className="btn btn-secondary"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
              <Link to={"/add-school"}>
                <button type="button" className="btn btn-info btn-space">
                  Add School
                </button>
              </Link>
              <h4>Schools List</h4>
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school: School) => {
                    return (
                      <tr key={school.schoolId}>
                        <td>{school.schoolId}</td>
                        <td>{school.schoolName}</td>
                        <td>{school.address}</td>
                        <td>{school.createdDate}</td>
                        <td>
                          {
                            <>
                              <Link to={"/schools/" + school?.schoolId}>
                                <button
                                  type="button"
                                  className="btn btn-info btn-space"
                                >
                                  Edit
                                </button>
                              </Link>
                              <Link to={"/"}>
                                <button
                                  type="button"
                                  className="btn btn-info btn-space"
                                  onClick={() =>
                                    this.deleteSchool(school.schoolId!)
                                  }
                                >
                                  Delete
                                </button>
                              </Link>
                            </>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
