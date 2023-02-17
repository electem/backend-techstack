import { Component } from "react";
import customersService from "../services/customers.service";
import ICustomerData from "../types/customer.types";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
type Props = {};
type State = {
  cutsomers: Array<ICustomerData>;
};

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "address",
    label: "Address",
    options: {
      filter: true,
      sort: false,
    },
  },
];

export default class CustomerList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cutsomers: [],
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  async retrieveCustomers() {
    await customersService
      .getAllCustomers()
      .then((response) => {
        this.setState({
          cutsomers: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  createData(name: string, address: string) {
    return { name, address };
  }

  render() {
    const { cutsomers } = this.state;
    const rows = [this.createData("hello", "address")];
    const options: MUIDataTableOptions = {
      filterType: "dropdown",
      print: true,
      download: true,
      filter: true,
      search: true,
      sort: true,
      viewColumns: true,
      rowsPerPage: 2,
      rowsPerPageOptions: [2, 4],
      jumpToPage: true,
      serverSide: true,
      expandableRows: true,
      draggableColumns: {
        enabled: true,
        transitionTime: 1,
      },
      textLabels: {
        pagination: {
          next: "Next ",
          previous: "Previous",
          rowsPerPage: "",
          displayRows: "ON",
        },
      },
    };
    return (
      <>
        <MUIDataTable
          title={"Customers List"}
          data={cutsomers}
          columns={columns}
          options={options}
        />
      </>
    );
  }
}
