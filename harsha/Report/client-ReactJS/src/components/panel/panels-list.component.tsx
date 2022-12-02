import { ChangeEvent, Component } from "react";
import PanelService from "../../services/panel.service";
import { Link, RouteComponentProps } from "react-router-dom";
import { Panel } from "../../types/panel.type";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = {
  panels: Array<Panel>;
  searchName: string;
};

export default class PanelsList extends Component<Props, State> {
  panelsList: Panel[] = [];
  
  constructor(props: Props) {
    super(props);
    this.retrievePanels = this.retrievePanels.bind(this);
    this.deletePanel = this.deletePanel.bind(this);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);

    this.state = {
      panels: [],
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrievePanels();
  }

  retrievePanels() {
    PanelService.getPanels()
      .then((response) => {
        this.setState({
          panels: response.data,
        });
        this.panelsList = response.data;
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

  retriveSearchedSchools(search: string) {
    this.setState({
      panels: this.panelsList.filter((panel) => {
        return panel.name!.includes(search);
      }),
    });
  }

  deletePanel(id: number) {
    PanelService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/panels");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { panels, searchName } = this.state;

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
                        <div className="card-title">
                          <div className="button">
                            <Link to={"/add-panel"}>
                              <button type="button" className="btn btn-primary">
                                Add Panel
                              </button>
                            </Link>
                          </div>
                          <h2>Panels List</h2>
                        </div>
                        <div className="row">
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                          />
                          <div>
                            <button
                              onClick={() =>
                                this.retriveSearchedSchools(searchName)
                              }
                              className="btn btn-secondary"
                              type="button"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <div className="bootstrap-data-table-panel">
                          <div className="table-responsive">
                            <table
                              id="row-select"
                              className=" table table-borderd table-hover"
                            >
                              <thead>
                                <tr>
                                  <th>Panel ID</th>
                                  <th>Panel Name</th>
                                  <th>Panel Description</th>
                                  <th>No of Tests</th>
                                  <th className="action">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {panels.map((panel: Panel) => {
                                  return (
                                    <tr key={panel.id}>
                                      <td>{panel.id}</td>
                                      <td>{panel.name}</td>
                                      <td>{panel.description}</td>
                                      <td>{panel.tests?.length}</td>
                                      <td>
                                        {
                                          <>
                                            <div>
                                              <Link to={"/panels/"+panel.id}>
                                                <i className="fa fa-edit fa-2x "></i>{" "}
                                              </Link>
                                              <i
                                                onClick={() =>
                                                  this.deletePanel(panel.id!)
                                                }
                                                className="icon fa fa-trash fa-2x"
                                              ></i>
                                            </div>
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
