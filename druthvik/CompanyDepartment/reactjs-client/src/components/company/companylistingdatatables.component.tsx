import { ChangeEvent, Component } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import companyService from '../../services/company.service';
import { Company } from '../../types/company.types';
import './company.css';
import { CompanyDelete } from '../../types/companydelete.types';
type Props = {};
type State = {
  company: Company[];
  searchTitle: string;
  pageNumber: number;
  pageSize: number;
  noOfRecords: number;
  selectedCompanyRows: [];
  setResetPaginantion: boolean;
  nextPage: number;
  previousPage: number;
};
const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
};

export default class Companylistingdatables extends Component<Props, State> {
  companyDeletes: CompanyDelete[] = [];
  companyLists: Company[] = [];
  companyDeleteList: Company[] = [];
  companynumbers: number[] = [];
  companyselected: {} = Company;

  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeRowsPerPages = this.handleChangeRowsPerPages.bind(this);
    this.state = {
      company: [],
      searchTitle: '',
      pageNumber: 1,
      pageSize: 5,
      noOfRecords: 0,
      setResetPaginantion: false,
      nextPage: 0,
      previousPage: 0,
      selectedCompanyRows: [],
    };
  }

  componentDidMount() {
    this.retrieveCompany();
    console.log(this.companyLists);
  }

  getAllCompanies(pageNumber: number, pageSize: number, searchTitle: string) {
    companyService
      .getAllCompanies(pageNumber, pageSize, searchTitle)
      .then((response) => {
        this.setState({
          company: response.data.elements,
          noOfRecords: response.data.totalElements,
        });
        this.companyLists = this.state.company;
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  }

  retrieveCompany() {
    const { pageNumber, pageSize, searchTitle } = this.state;
    this.getAllCompanies(pageNumber, pageSize, searchTitle);
  }

  async onChangePage(pageNumber: number) {
    const { pageSize, searchTitle } = this.state;
    this.getAllCompanies(pageNumber, pageSize, searchTitle);
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchTitle: e.target.value,
    });
  }

  retriveSerchedCompany() {
    this.setState({
      pageNumber: 1,
      pageSize: 5,
      noOfRecords: 0,
    });
    this.retrieveCompany();
  }

  handleChange = (state: { selectedRows: any }) => {
    this.setState({
      selectedCompanyRows: state.selectedRows,
    });
    this.companyDeleteList = state.selectedRows;
    console.log(this.companyDeleteList);
  };

  handleDelete() {
    const ids = this.companyDeleteList.map((ids) => ids.id);
    console.log(ids);
    companyService.deleteCompany(ids);
  }

  async handleChangeRowsPerPages(pageSize: number) {
    const { searchTitle, pageNumber } = this.state;
    this.getAllCompanies(pageNumber, pageSize, searchTitle);
  }

  render() {
    const { company, searchTitle, pageSize, noOfRecords } = this.state;

    const columns = [
      {
        name: 'Id',
        sortable: true,
        selector: 'id',
        style: {
          fontSize: '15px',
          fontWeight: 'heavy',
        },
      },
      {
        name: 'Name',
        sortable: true,
        selector: 'name',
        style: {
          fontSize: '15px',
          fontWeight: 'heavy',
        },
      },
      {
        name: 'Location',
        selector: 'location',
        sortable: true,
        className: 'text-center',
        style: {
          fontSize: '15px',
          fontWeight: 'heavy',
        },
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
        className: 'text-center',
        style: {
          fontSize: '15px',
          fontWeight: 'heavy',
        },
      },
      {
        name: 'Options',
        sortable: true,
        className: 'text-center',
        cell: (row: Company) => (
          <>
            <Link to={'companyedit/' + row.id}>
              <i
                style={{
                  color: 'blue',
                  paddingRight: '20px',
                }}
                className="fa fa-edit fa-2x "
              ></i>
              <i style={{ color: 'red' }} className="fa fa-trash fa-2x"></i>
            </Link>
          </>
        ),
      },
    ];

    return (
      <div>
        <div className="maincontent w-auto">
          <div className="row">
            <div className="col-lg-24">
              <div className="col-xs-12 pl-0">
                <i className="fa fa-user Fs40 blue Fleft MarRight10 MarBottom10"></i>

                <div className="font-weight-bold font">Company</div>
                <span className="Fs15 gray FontRalewayRegular">
                  Create and modify Company and their attributes
                </span>
              </div>

              <div className="col-xs-12 float-right text-right">
                <Link to={'/company'}>
                  <button
                    type="button"
                    className="btn buttonstyling mr-2"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    data-target="#collapseOne"
                  >
                    <i className="fa fa-plus Fs14 white"></i> Add Company
                  </button>
                </Link>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-gear Fs14 white"></i> Options
                    <span className="caret"></span>{' '}
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a>
                        <i className="fa fa-cloud-download"></i>
                        Import Customers
                      </a>
                    </li>
                    <li>
                      <a
                        href="/MTR/chardonlabs/help/help.jsf"
                        className="Animated05"
                      >
                        <i className="fa fa-question-circle"></i>
                        Help
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
        <div className="BordRad3">
          <div id="custom-toolbar" style={{ paddingBottom: '8px' }}>
            <div className="input-group col-xs-24 HoverEffect">
              <input
                type="hidden"
                name="custTableForm:j_idt218"
                value="custTableForm:j_idt218"
              />

              <span className="input-group-btn">
                <button className="btn transparent" type="button">
                  <i className="fa fa-search"></i>
                </button>
                <a
                  id="custTableForm:j_idt218:searchIconLinkCustomers"
                  className="ui-commandlink ui-widget"
                ></a>
              </span>
              <input
                id="custTableForm:j_idt218:searchCustomers"
                type="text"
                name="custTableForm:j_idt218:searchCustomers"
                className="form-control dummystyleInput transparent"
                placeholder="Search"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
                onKeyUp={() => this.retriveSerchedCompany()}
              />
              <span className="input-group-btn">
                <button className="btn transparent" type="reset">
                  <i className="fa fa-times-circle Fs18"></i>
                </button>
                <a
                  id="custTableForm:j_idt218:customerSearchClose"
                  className="ui-commandlink ui-widget"
                ></a>
              </span>
            </div>
          </div>

          <div
            id="custTableForm:j_idt234"
            className="ui-panel ui-widget ui-widget-content ui-corner-all customerPanel"
            data-widget="widget_custTableForm_j_idt234"
          >
            <div
              id="custTableForm:j_idt234_content"
              className="ui-panel-content ui-widget-content"
            >
              <div
                id="custTableForm:custTable"
                className="ui-datatable ui-widget metricTable custTable"
              >
                <div className=" striped">
                  <DataTable
                    className="ui-state-default"
                    columns={columns}
                    data={company}
                    customStyles={tableCustomStyles}
                    pagination
                    paginationTotalRows={noOfRecords}
                    paginationServer={true}
                    paginationPerPage={pageSize}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                    onChangePage={async (page) => this.onChangePage(page)}
                    selectableRows
                    onChangeRowsPerPage={async (page) =>
                      this.handleChangeRowsPerPages(page)
                    }
                    onSelectedRowsChange={this.handleChange}
                    contextActions={
                      <button
                        key="delete"
                        onClick={this.handleDelete}
                        style={{ backgroundColor: 'red' }}
                      >
                        Delete
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="maincontent w-auto footer">
          <div className="TexAlCenter row">
            <div className="col-sm-2 col-xs-12">
              <div className="padding-top-md">
                <button
                  type="button"
                  className="btn btn-link"
                  data-toggle="modal"
                  data-target="#myModalSupport"
                >
                  <i className="fa fa-envelope support"></i> Support
                </button>
              </div>
            </div>
            <div className="col-sm-8 hidden-xs">
              <div className="copyright">
                © Copyright 2014-2020 Electems | All rights reserved.
              </div>
            </div>
            <div className="col-sm-1 col-xs-12">
              <div className="feedback">
                <button
                  type="button"
                  className="btn btn-link"
                  data-toggle="modal"
                  data-target="#myModalFeedback"
                >
                  <i className="fa fa-comments-o"></i>
                  Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
