import { Component } from "react";
import SchoolService from "../services/school.service";
import { Link } from "react-router-dom";
import { School } from "../types/school.type";

type Props = {};

type State = {
  schools: Array<School>;
};

export default class SchoolsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveSchools = this.retrieveSchools.bind(this);

    this.state = {
      schools: [],
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
  };
  
  render() {
    const { schools} = this.state;

    return (
      <>
        <div>
          <Link to={"/add-school"}>
            <button type="button" className="btn btn-success">
              Add School
            </button>
          </Link>
        </div>
        <div className="list1 row">
          <div className="col-md-6">
            <h4 >Schools List</h4>
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
                      <td >{school.schoolId}</td>
                      <td>{school.schoolName}</td>
                      <td>{school.address}</td>
                      <td>{school.createdDate}</td>
                      <td>
                        {
                          <Link to={"/edit-school"}>
                            <button type="button" className="btn btn-primary">
                              Edit
                            </button>
                          </Link>
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
