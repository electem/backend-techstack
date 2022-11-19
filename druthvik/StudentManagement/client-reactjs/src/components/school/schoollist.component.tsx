/* eslint-disable array-callback-return */
import { ChangeEvent, Component } from "react";
import schoolService from "../../services/school.service";
import { Link, RouteComponentProps } from "react-router-dom";
import ISchoolData from "../../types/school.types";

interface RouterProps {}
type Props = RouteComponentProps<RouterProps>;
type State = {
  schools: Array<ISchoolData>;
  searchTitle: string;
  searchSchools: Array<ISchoolData>;
};
export default class SchoolList extends Component<Props, State> {
  schools: ISchoolData[] = [];
  schoolsSearch: ISchoolData[] = [];
  searchSchools: ISchoolData[] = [];

  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.state = {
      schools: [],
      searchTitle: "",
      searchSchools: [],
    };
  }
  componentDidMount() {
    this.retrieveSchools();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchTitle: e.target.value,
    });
  }

  retriveSerchedSchools(search: string) {
    this.setState({
      schools: this.schools.filter((option) => {
        return option.name?.startsWith(search);
      }),
    });
  }

  retrieveSchools() {
    schoolService
      .getAll()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
        this.schools = this.state.schools;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteSchools(id: any) {
    schoolService
      .delete(id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/studentlist");
      })

      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { schools, searchTitle } = this.state;

    return (
      <>
        <div className="list row">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={this.onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              onClick={() => this.retriveSerchedSchools(searchTitle)}
              className="btn btn-outline-secondary"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        <h4>Schools List</h4>
        <div className="list1 row">
          <div className="col-md-6">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school: ISchoolData) => {
                  return (
                    <tr key={school.schoolid}>
                      <td>{school.schoolid}</td>
                      <td>{school.name}</td>
                      <td>{school.address}</td>
                      <td>
                        {
                          <>
                            <Link to={"/schoolsedit/" + school.schoolid}>
                              <button
                                type="button"
                                className="badge badge-primary"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="badge badge-danger"
                                onClick={() =>
                                  this.deleteSchools(school.schoolid)
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
      </>
    );
  }
}
