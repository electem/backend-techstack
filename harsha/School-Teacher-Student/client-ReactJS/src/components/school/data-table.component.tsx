import { Component } from "react";
import SchoolService from "../../services/school.service";
import { School } from "../../types/school.type";
import DataTable from "react-data-table-component";

type Props = {};

type State = {
  schools: Array<School>;
};

const columns = [
  {
    name: "School Names",
    sortable: true,
    selector: "schoolName",
  },
  {
    name: "School Address",
    selector: "address",
    sortable: true,
  },
  {
    name: "Created Date",
    selector: "createdDate",
    sortable: true,
  },
];

export default class SchoolDataTable extends Component<Props, State> {
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
      .then((response) => {
        this.setState({
          schools: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { schools } = this.state;

    return (
      <DataTable
        title="Schools List"
        columns={columns}
        data={schools}
        pagination
      />
    );
  }
}
