import { Component } from "react";
import SchoolService from "../services/school.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { School } from "../types/school.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = {
  schools: Array<School>;
  currentSchool: School;
};

export default class SchoolsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveSchools = this.retrieveSchools.bind(this);
    this.deleteSchool = this.deleteSchool.bind(this);

    this.state = {
      schools: [],
      currentSchool: {},
    };
  }

  componentDidMount() {
    this.retrieveSchools();
  }

  retrieveSchools() {
    SchoolService.getSchools()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteSchool(id: any) {
    SchoolService.delete(id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/schools");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { schools } = this.state;

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
                                className="badge badge-primary"
                              >
                                Edit
                              </button>
                            </Link>
                            <Link to={"/"}>
                              <button
                                type="button"
                                className="badge badge-danger"
                                onClick={() =>
                                  this.deleteSchool(school.schoolId)
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
