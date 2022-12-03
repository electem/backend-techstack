/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { ChangeEvent, Component } from "react";
import { Link } from "react-router-dom";
import companyService from "../../services/company.service";
import { Department } from "../../types/department.types";
import { Company } from "../../types/company.types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import "./company.css";
type Props = {};
type State = Company & {
  departments: Array<Department>;
  draggedDepartments: Array<Department>;
};
const grid = 8;
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});
const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const deleteItem = (list: Department[], index: number) => {
  return list.splice(index, 1);
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
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      id: 0,
      name: "",
      email: "",
      location: "",
      departments: [],
      draggedDepartments: [
        {
          name: "",
        },
      ],
    };
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
  onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newDatas = this.state.departments;
    const [removed] = newDatas.splice(source.index, 1);
    this.state.draggedDepartments.push(removed);
  }

  render() {
    const { departments, name, location, email, draggedDepartments } =
      this.state;

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
                  <div className="col-md-10 col-md-offset-0 col-sm-18 col-sm-offset-3 col-xs-24">
                    <label
                      id="custTabs:j_idt287:j_idt289"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:j_idt287:street1"
                    >
                      Drag And Drop:
                    </label>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            Went well
                            {departments.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.name}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            To improve
                            {draggedDepartments.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.name}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div>

                  {/* <div className="col-md-10 col-md-offset-0 col-sm-18 col-sm-offset-3 col-xs-24">
                    <label
                      id="custTabs:j_idt287:j_idt289"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:j_idt287:street1"
                    >
                      Department Listing
                    </label>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            Department Listing
                            {departments.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.name}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div>
                  <div className="col-md-10 col-md-offset-0 col-sm-offset-3 col-xs-24 margin-left">
                    <label
                      id="custTabs:j_idt287:j_idt289"
                      className="ui-outputlabel ui-widget"
                      htmlFor="custTabs:j_idt287:street1"
                    >
                      Added Departments:
                    </label>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                      <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            Added Departments:
                            {this.draggedDepartments.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.name}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div> */}

                  {/* <div className="col-md-10 col-md-offset-0 col-sm-18 col-sm-offset-3 col-xs-24">
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
                      value={email}
                      onChange={this.onChangeemail}
                    />
                    <div
                      id="custTabs:j_idt287:j_idt290"
                      aria-live="polite"
                      className="ui-message"
                    ></div>
                  </div> */}
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
