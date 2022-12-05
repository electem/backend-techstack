/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Component, ChangeEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Company } from "../../types/company.types";
import companyService from "../../services/company.service";
interface RouterProps {
  id: string;
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentComany: Company;
};
export default class companyedit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.state = {
      currentComany: {
        id: 0,
        name: "",
        email: "",
        location: ",",
      },
    };
  }
  componentDidMount() {
    this.getCompanyById(this.props.match.params.id);
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState((prevState) => ({
      currentComany: {
        ...prevState.currentComany,
        name: name,
      },
    }));
  }
  onChangeLocation(e: ChangeEvent<HTMLInputElement>) {
    const address = e.target.value;

    this.setState((prevState) => ({
      currentComany: {
        ...prevState.currentComany,
        address: address,
      },
    }));
  }
  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentComany: {
        ...prevState.currentComany,
        email: email,
      },
    }));
  }
  getCompanyById(id: string) {
    companyService
      .getCompanyById(id)
      .then((response) => {
        this.setState({
          currentComany: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  }
  render() {
    const { currentComany } = this.state;
    return (
      <div>
        <div className=""></div>
        <div id="custTabs:j_idt207" className="ui-outputpanel ui-widget">
          <div
            id="custTabs:j_idt208"
            aria-live="polite"
            className="ui-message"
          ></div>
        </div>
        <div className="row">
          <div className="panel with-nav-tabs panel-success2">
            <div className="panel-heading padding-left">
              <ul className="nav nav-tabs nav-justified no-stack d-block">
                <li className="active">
                  <a href="#tab1default" data-toggle="tab">
                    Add / Edit Company
                  </a>
                </li>
              </ul>
            </div>
            <div id="generalContent" className="panel-body">
              <div className="tab-content d-flex">
                <div
                  className="tab-pane fade in active text-center"
                  id="tab1default"
                >
                  <div className="col-md-4 col-sm-6 col-xs-24">
                    <img
                      id="custTabs:customerImage"
                      src="img/factory_icon.png"
                      height="100"
                      width="100"
                      className="customerGraphicImage"
                    />
                    <br />
                    <button type="button" className="btn btn-sm btn-default">
                      Change/Add Image
                    </button>
                    <a
                      id="custTabs:customerSharedImages"
                      className="ui-commandlink ui-widget d-none"
                    ></a>
                    <p></p>
                    <div
                      id="custTabs:j_idt218"
                      className="ui-outputpanel ui-widget well well-sm"
                    >
                      <div
                        id="custTabs:customerHeaderFooterChkBox"
                        className="ui-chkbox ui-widget customerHeaderFooterChkBox"
                      >
                        <div className="ui-helper-hidden-accessible">
                          <input type="checkbox" aria-checked="true" />
                        </div>
                        <div className="ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-active">
                          <span className="ui-chkbox-icon ui-icon ui-icon-check ui-c"></span>
                        </div>
                      </div>
                      Use Default Header/Footer
                      <br />
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#customerHeaderFooterModal"
                      >
                        Edit
                      </button>
                      <a
                        id="custTabs:editHeaderFooterCustomer12"
                        href="#"
                        className="ui-commandlink ui-widget d-none"
                      ></a>
                    </div>
                  </div>
                  <div className="col-md-10 col-sm-18 col-xs-24">
                    <label
                      id="custTabs:j_idt222"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:status"
                    >
                      Status:
                    </label>
                    <select
                      id="custTabs:status"
                      name="custTabs:status"
                      className="form-control"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-10 col-md-offset-0 col-sm-18 col-sm-offset-3 col-xs-24">
                    <label
                      id="custTabs:j_idt287:j_idt289"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:j_idt287:street1"
                    >
                      Company Name:
                    </label>
                    <input
                      id="custTabs:j_idt287:street1"
                      type="text"
                      name="custTabs:j_idt287:street1"
                      className="form-control street1"
                      value={currentComany.name}
                      onChange={this.onChangeName}
                    />
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div>
                  <div className="col-md-10 col-md-offset-0 col-sm-18 col-sm-offset-3 col-xs-24">
                    <label
                      id="custTabs:j_idt287:j_idt289"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:j_idt287:street1"
                    >
                      Company Location:
                    </label>
                    <input
                      id="custTabs:j_idt287:street1"
                      type="text"
                      name="custTabs:j_idt287:street1"
                      className="form-control street1"
                      value={currentComany.location}
                      onChange={this.onChangeLocation}
                    />
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div>
                  <div className="col-md-10 col-sm-18 col-xs-24">
                    <label
                      id="custTabs:j_idt222"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:status"
                    >
                      Select Department:
                    </label>
                    <select
                      id="custTabs:status"
                      name="custTabs:status"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {currentComany.department?.map((options) => (
                        <option key={options.id} value={options.name}>
                          {options.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-10 col-md-offset-0 col-sm-18 col-sm-offset-3 col-xs-24">
                    <label
                      id="custTabs:j_idt287:j_idt289"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:j_idt287:street1"
                    >
                      Company Email:
                    </label>
                    <input
                      id="custTabs:j_idt287:street1"
                      type="text"
                      name="custTabs:j_idt287:street1"
                      className="form-control street1"
                      value={currentComany.email}
                      onChange={this.onChangeEmail}
                    />
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div>
                  <div className="row">
                    <div className="col-xs-24 text-right close-button ">
                      <Link to={"/company2"}>
                        <button
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          className="btn btn-default  mr-2"
                        >
                          Cancel
                        </button>
                      </Link>
                      <a
                        id="custTabs:customerClose"
                        href="#"
                        className="ui-commandlink ui-widget d-none"
                      ></a>
                      <Link to={"/companyList"}>
                        <button
                          id="custTabs:j_idt331"
                          className="ui-commandlink ui-widget btn btn-sm btn-primary link2btn"
                        >
                          <i className="fa fa-check Fs20 green"></i>Update
                        </button>
                      </Link>
                      <a
                        id="custTabs:customerUpdate"
                        href="#"
                        className="ui-commandlink ui-widget  d-none"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
