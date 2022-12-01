/* eslint-disable array-callback-return */
import { ChangeEvent, Component } from "react";
import schoolService from "../../services/school.service";
import { Link, RouteComponentProps } from "react-router-dom";
import ISchoolData from "../../types/school.types";

//import Pagination from "react-js-pagination";
interface RouterProps {}
type Props = RouteComponentProps<RouterProps>;
type State = {
  schools: Array<ISchoolData>;
  searchTitle: string;
  searchSchools: Array<ISchoolData>;
  page: 1;
  count: 0;
  pageSize: 3;
};
export default class SchoolList extends Component<Props, State> {
  schools: ISchoolData[] = [];
  schoolsSearch: ISchoolData[] = [];
  searchSchools: ISchoolData[] = [];
  pageSizes: number[] = [3, 6, 9];
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.state = {
      schools: [],
      searchTitle: "",
      searchSchools: [],
      page: 1,
      count: 0,
      pageSize: 3,
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
      .getAllSchools()
      .then((response) => {
        this.setState({
          schools: response.data,
        });
        this.schools = this.state.schools;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteSchools(id: number) {
    schoolService
      .deleteSchool(id)
      .then((response) => {
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
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={this.onChangeSearchTitle}
            onKeyUp={() => this.retriveSerchedSchools(searchTitle)}
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
                                className="badge badge-danger marignleft"
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
            {/* <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={() => this.handlePageChange}
            />
            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={() => this.handlePageChange}
            /> */}
            {/* <div>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={5}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={this.handlePageChanges.bind(this)}
              />
            </div> */}
          </div>
        </div>
      </>
    );
  }
}
