import { ChangeEvent, Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import TestService from "../../services/test.service";
import { Panel } from "../../types/panel.type";
import { Test } from "../../types/test.type";
import PanelService from "../../services/panel.service";

interface RouterProps {}

type Props = RouteComponentProps<RouterProps>;

type State = Panel & {
  testsList: Array<Test>;
  currentPanel:Panel
};

export default class AddPanel extends Component<Props, State> {
  selectedTest:Test[]=[];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSelectTests = this.onSelectTests.bind(this);
    this.savePanel = this.savePanel.bind(this);

    this.state = {
      name: "",
      description: "",
      tests: [],
      testsList: [],
      currentPanel:{}
    };
  }

  componentDidMount() {
    this.retrieveTests();
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }

  onSelectTests(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value
    const testData = this.state.testsList?.filter(
      (test) => test.name === value
    );
    this.selectedTest.push(testData![0])
    console.log(this.selectedTest);
    this.setState({
      tests:this.selectedTest,
    });
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

  savePanel() {
    const panel: Panel = {
      name: this.state.name,
      description: this.state.description,
      tests: this.state.tests
    };
    PanelService.create(panel)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          tests: response.data.tests
        });
        this.props.history.push("/panels");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { testsList } = this.state;

    return (
      <>
      <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures"></div>
       <div className="header">
          <div className="container-fluid">
            <div className="row" >
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
                <h2>ADD PANEL FORM</h2>
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
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input
                        type="description"
                        className="form-control"
                        placeholder="Enter Description"
                        onChange={this.onChangeDescription}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tests</label>
                      <select className="form-control" onChange={(event)=>this.onSelectTests(event)}>
                      <option value="">Select Tests</option>
                      {testsList.map((test) => (
                  <option key={test.id} typeof="checked" value={test.name} >
                    {test.name}
                  </option>
                ))}
                      </select>
                    </div>
                    <button type="submit"  onClick={this.savePanel} className="btn btn-info btn-space">
                      Submit
                    </button>
                    <Link to="/panels">
                    <button type="submit" className="btn btn-info btn-warning ml-2">
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
