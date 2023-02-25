import { ChangeEvent, Component } from "react";
import { RouteComponentProps } from "react-router";
import { Panel } from "../../types/panel.type";
import { Test } from "../../types/test.type";
import TestService from "../../services/test.service";
import PanelService from "../../services/panel.service";
import { Link } from "react-router-dom";

interface RouterProps {
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentPanel: Panel;
  testsList: Array<Test>;
};

export default class EditPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPanel = this.getPanel.bind(this);
    this.updatePanel = this.updatePanel.bind(this);

    this.state = {
      currentPanel: {},
      testsList: [],
    };
  }

  componentDidMount() {
    this.getPanel(this.props.match.params.id);
    this.retrieveTests();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPanel: {
          ...prevState.currentPanel,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentPanel: {
        ...prevState.currentPanel,
        description: description,
      },
    }));
  }

  retrieveTests() {
    TestService.getTests()
      .then((response) => {
        this.setState({
          testsList: response.data,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  getPanel(id: string) {
    PanelService.get(id)
      .then((response) => {
        this.setState({
          currentPanel: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  
  updatePanel() {
    PanelService.update(
      this.state.currentPanel,
      this.state.currentPanel.id!
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentPanel } = this.state;

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
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrap">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10">
                  <div className="card">
                    <div className="card-title">
                      <h2>EDIT PANEL FORM</h2>
                    </div>
                    <div className="card-body">
                      <div className="basic-form">
                        <form>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="name"
                              className="form-control"
                              placeholder="Enter Name"
                              onChange={this.onChangeName}
                              value={currentPanel.name}
                            />
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <input
                              type="description"
                              className="form-control"
                              placeholder="Enter Description"
                              onChange={this.onChangeDescription}
                              value={currentPanel.description}
                            />
                          </div>

                          <div className="form-group">
                            <label>Tests</label>
                            <select className="form-control">
                              <option value="">Select Tests</option>
                              <option typeof="checked">
                                {currentPanel.name}
                              </option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-info btn-space"
                            onClick={this.updatePanel}
                          >
                            Update
                          </button>
                          <Link to="/panels">
                            <button
                              type="submit"
                              className="btn btn-info btn-warning ml-2"
                            >
                              Cancel
                            </button>
                          </Link>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
