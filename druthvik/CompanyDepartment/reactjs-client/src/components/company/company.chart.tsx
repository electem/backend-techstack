/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import companyService from "../../services/company.service";
import { Company } from "../../types/company.types";
import { Chart, registerables } from "chart.js";
export default class CompanyCharts extends Component {
  company: Company[] = [];
  companyNames: string[] = [];
  companyDepartmentCount: number[] = [];
  componentDidMount() {
    this.retrieveCompany();
  }

  getcharts() {
    Chart.register(...registerables);
    new Chart("myChart", {
      type: "bar",
      data: {
        labels: this.companyNames,
        datasets: [
          {
            label: "No of Departments In Companies",
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: "rgba(255, 99, 132, 1)",
            data: this.companyDepartmentCount,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  companyCharts() {
    Chart.register(...registerables);
    new Chart("MultiAxisChart", {
      type: "line",
      data: {
        labels: this.companyNames,
        datasets: [
          {
            label: "No of Departments In Companies",
            data: this.companyDepartmentCount,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.4,
            yAxisID: "teacherNumber",
          },
        ],
      },

      options: {
        scales: {
          teacherNumber: {
            beginAtZero: false,
            type: "linear",
            position: "left",
          },
          studentNumber: {
            beginAtZero: false,
            type: "linear",
            position: "right",
          },
        },
      },
    });
  }
  async retrieveCompany() {
    await companyService.getCompanies().then((response) => {
      this.company = response.data;
      console.log(this.company);
      this.companyNames = this.company.map((name) => name.name!);
      this.companyDepartmentCount = this.company.map(
        (department) => department.department?.length!
      );
    });
    this.getcharts();
    this.companyCharts();
  }
  render() {
    return (
      <div>
        <div className="maincontent">
          <div className="row">
            <div className="col-lg-24">
              <div className="col-xs-12" style={{ paddingLeft: "0" }}>
                <i className="fa fa-bar-chart-o fa-2x blue Fleft MarRight10 MarBottom10"></i>

                <div className="font-weight-bold font">Company Analytics</div>
                <span className="Fs15 gray FontRalewayRegular"></span>
              </div>
              <div
                className="col-xs-12"
                style={{ float: "right", textAlign: "right" }}
              >
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-gear Fs14 white"></i> Options
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="Animated05">
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
        <div className="maincontent TexAlCenter">
          <form
            id="chartForm"
            name="chartForm"
            method="post"
            action="/MTR/charts/charts.jsf"
            encType="application/x-www-form-urlencoded"
          >
            <input type="hidden" name="chartForm" value="chartForm" />
            <div className="row">
              <div className="col-xs-24">
                <a href="#" id="help-stereotype">
                  <i className="icon-YY Fs20 blue"></i>
                </a>
              </div>
            </div>
            <div id="chartForm:j_idt204" className="ui-outputpanel ui-widget">
              <div
                id="chartForm:j_idt205"
                aria-live="polite"
                className="ui-message"
              ></div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-24 ">
                <div className="col-xs-24 whale">
                  <a title="Service Charts">
                    <div>
                      <canvas id="MultiAxisChart"></canvas>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-24">
                <div className="col-xs-24 whale">
                  <a title="Log Charts">
                    <div>
                      <canvas id="myChart"></canvas>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <input
              type="hidden"
              name="javax.faces.ViewState"
              id="j_id1:javax.faces.ViewState:4"
              value="-584564820416856473:-946943436451018143"
              autoComplete="off"
            />
          </form>
        </div>
        <div
          id="footer"
          className="maincontent"
          style={{ marginTop: "-10px !important;" }}
        >
          <div className="TexAlCenter row">
            <div className="col-sm-2 col-xs-12">
              <div style={{ paddingTop: "2px" }}>
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
              <div style={{ paddingTop: "0px" }}>
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
