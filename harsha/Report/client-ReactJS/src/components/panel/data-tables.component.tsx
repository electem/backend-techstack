import { Component } from "react";
import PanelService from "../../services/panel.service";
import { Panel } from "../../types/panel.type";
import DataTable from "react-data-table-component";

type Props = {};

type State = {
  panels: Array<Panel>;
  pageNumber: number;
  pageSize: number;
  totalItemsCount: number;
};

const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
};

export default class PanelDataTable extends Component<Props, State> {
  panelsList: Panel[] = [];

  constructor(props: Props) {
    super(props);
    this.retrievePanels = this.retrievePanels.bind(this);
    this.deletePanel = this.deletePanel.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      panels: [],
      pageNumber: 0,
      pageSize: 4,
      totalItemsCount: 0,
    };
  }

  componentDidMount() {
    this.retrievePanels();
  }

  retrievePanels() {
    const { pageNumber, pageSize } = this.state;
    PanelService.getAllPanels(pageNumber, pageSize)
      .then((response) => {
        this.setState({
          panels: response.data.content,
          totalItemsCount: response.data.totalElements,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  handlePageChange(pageNumber: number) {
    const { pageSize } = this.state;
    PanelService.getAllPanels(pageNumber, pageSize)
      .then((response) => {
        this.setState({
          panels: response.data.content,
          totalItemsCount: response.data.totalElements,
        });
        this.panelsList = this.state.panels;
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deletePanel(id: number) {
    PanelService.delete(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { panels, pageSize, totalItemsCount, pageNumber } = this.state;
    const columns = [
      {
        name: "Panel Id",
        sortable: true,
        selector: "id",
      },
      {
        name: "Panel Name",
        sortable: true,
        selector: "name",
      },
      {
        name: "Panel Desciption",
        sortable: true,
        selector: "description",
      },
      {
        name: "Action",
        sortable: true,
        selector: "",
        cell: () => (
          <>
            <i className="fa fa-edit fa-2x "></i>
            <i className="icon fa fa-trash fa-2x"></i>
          </>
        ),
      },
    ];

    return (
      <>
        <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures"></div>
        <div className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="float-left">
                  <div className="hamburger sidebar-toggle">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                  </div>
                </div>
                <div className="head">
                  <a>Report Management System</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrap">
          <div className="main">
            <div className="container-fluid">
              <section id="main-content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <DataTable
                        className="data-table"
                        title="Panels List"
                        columns={columns}
                        data={panels}
                        pagination
                        customStyles={tableCustomStyles}
                        paginationRowsPerPageOptions={[4, 5, 10, 25, 50, 100]}
                        paginationServer={true}
                        paginationPerPage={pageSize}
                        paginationTotalRows={totalItemsCount}
                        paginationDefaultPage={pageNumber}
                        onChangePage={(page) => this.handlePageChange(page)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }
}
