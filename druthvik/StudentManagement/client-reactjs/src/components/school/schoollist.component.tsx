/* eslint-disable array-callback-return */
import { ChangeEvent, ChangeEventHandler, Component } from "react";
import schoolService from "../../services/school.service";
import { Link } from "react-router-dom";
import ISchoolData from "../../types/school.types";

type Props = {};
type State = {
  schools: Array<ISchoolData>;
  searchTitle: string;
  searchSchools: Array<ISchoolData>;
};
export default class SchoolList extends Component<Props, State> {
  schools: ISchoolData[] = [];
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

  retriveSerchedSchools(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      schools: this.schools.filter((option) => {
        return option.name.startsWith(e.target.value);
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
        console.log(response.data);
        this.schools = this.state.schools;
        console.log(this.schools);
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
          <Link to={"/add-school"}>
            <button type="button" className="btn btn-success">
              Add School
            </button>
          </Link>
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
