/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { ChangeEvent, Component } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import companyService from "../../services/company.service";
import { Department } from "../../types/department.types";
import { Company } from "../../types/company.types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import "./company.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
type Props = {};
type State = Company & {
  departments: Array<Department>;
  loading: boolean;
  message: string;
};

export default class CreateCompany extends Component<Props, State> {
  departmentsLists: Department[] = [];
  selectedDepartments: Department[] = [];
  draggedDepartments: Department[] = [];
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onDepartmentSelect = this.onDepartmentSelect.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.state = {
      id: 0,
      name: "",
      email: "",
      location: "",
      departments: [],
      loading: false,
      message: "",
    };
  }
  validationSchema() {
    return Yup.object().shape({
      name: Yup.string().required("This field is required!"),
      email: Yup.string().required("This field is required!"),
      phonenumber: Yup.number().required("This field is required!"),
      departments: Yup.string().required("This field is required!"),
    });
  }
  componentDidMount() {
    this.retrieveDepartment();
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      location: e.target.value,
    });
  }
  onChangeemail(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value,
    });
  }
  saveCompany = () => {
    const data: Company = {
      id: this.state.id,
      name: this.state.name,
      location: this.state.location,
      email: this.state.email,
      department: this.state.department,
    };

    companyService
      .createCompany(data)
      .then((response) => {
        this.setState({
          name: response.data.name,
          location: response.data.location,
          email: response.data.email,
          department: response.data.department,
        });
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  };
  retrieveDepartment() {
    companyService
      .getAllDepartments()
      .then((response) => {
        this.setState({
          departments: response.data,
        });
        this.departmentsLists = this.state.departments;
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  }
  onDepartmentSelect(event: ChangeEvent<HTMLSelectElement>) {
    const select = event.target.value;
    const departmentSelect = this.state.departments.filter(
      (s) => s.name === select
    );
    this.selectedDepartments.push(departmentSelect[0]);
    this.setState({
      department: this.selectedDepartments,
    });
  }

  render() {
    const { departments, name, location, email } = this.state;

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
                      value={name}
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
                      value={location}
                      onChange={this.onChangeAddress}
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
                      onChange={this.onDepartmentSelect}
                      id="custTabs:status"
                      name="custTabs:status"
                      className="form-control"
                    >
                      <option value="">Select</option>
                      {departments.map((options) => (
                        <option key={options.id} value={options.name}>
                          {options.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-xs-24 text-right close-button ">
                      <Link to={"/companyList"}>
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
                          onClick={this.saveCompany}
                          id="custTabs:j_idt331"
                          className="ui-commandlink ui-widget btn btn-sm btn-primary link2btn"
                        >
                          <i className="fa fa-check Fs20 green"></i>Save
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
