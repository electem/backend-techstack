import { Component, ChangeEvent } from "react";
import schoolService from "../../services/school.service";
import { Link } from "react-router-dom";
import ISchoolData from "../../types/school.types";

type Props = {};

type State = {
  schools: Array<ISchoolData>;
};
export default class SchoolList extends Component<Props, State> {
  schools: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      schools: [],
    };
  }
  componentDidMount() {
    this.retrieveSchools();
  }

  retrieveSchools() {
    schoolService
      .getAll()
      .then((response: any) => {
        this.setState({
          schools: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { schools } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Schools List</h4>

          <table className="table table-bordered table-hover table-bordered border-secondary">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>edit</th>
              </tr>
            </thead>

            <tbody>
              {schools.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>{item.schoolid}</td>

                    <td>{item.name}</td>

                    <td>{item.address}</td>
                    <td>
                      <Link
                        to={"/school/" + item.schoolid}
                        className="badge badge-warning"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
