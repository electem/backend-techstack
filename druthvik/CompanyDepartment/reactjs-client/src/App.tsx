/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Company from "./components/company/company.component";
import CompanyCharts from "./components/company/company.chart";
import Companylistingdatables from "./components/company/companylistingdatatables.component";
import companyedit from "./components/company/companyedit.component";
import Login from "./components/login.component";
class App extends Component {
  render() {
    return (
      <div id="header">
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-tooltip.js"></script>
        <script src="js/bootstrap-confirmation.js"></script>
        <script type="text/javascript" src="js/spark/layout.js"></script>
        <script type="text/javascript" src="js/lims_grid.js?v=44"></script>
        <script type="text/javascript" src="js/lims_permission.js"></script>
        <script
          type="text/javascript"
          src="js/jquery.dirtyforms.min.js"
        ></script>
        <script type="text/javascript" src="js/lims_permission.js"></script>
        <script
          type="text/javascript"
          src="js/jquery.dirtyforms.min.js"
        ></script>
        <link type="text/css" rel="stylesheet" href="css/spark/animate.css" />
        <link type="text/css" rel="stylesheet" href="css/glyphs.css" />
        <link type="text/css" rel="stylesheet" href="css/octicons.css" />
        <link type="text/css" rel="stylesheet" href="css/override.css" />
        <link type="text/css" rel="stylesheet" href="css/options.css" />
        <div id="layout-topbar" className="ShadowGray">
          <div
            className="font-weight-bold fontfamily title"
            style={{ textAlign: "center" }}
          >
            <h1>Company Management System</h1>
          </div>
          <div id="layout-topbar-indent">
            <img
              id="headerForm:j_idt12"
              alt=""
              className="img-responsive"
            ></img>
            <a
              href="#"
              id="mobile-menu-button"
              className="BordRad3 white ShowOnMobile"
            >
              <i className="fa fa-bars"></i> Menu
            </a>
            <a
              href="#"
              id="mobile-menu-button-gray"
              className="BordRad3 white ShowOnMobile topmenu_to_menu2"
            >
              <i className="fa fa-caret-down"></i> Top Menu
            </a>
            <ul id="layout-topbar-menu">
              <li>
                <a
                  id="headerForm:logOut"
                  href="/MTR/j_spring_security_logout"
                  className="Animated05"
                >
                  <i className="fa fa-sign-out"></i>Logout
                </a>
              </li>
              <li className="fa fa-ellipsis-v menu-separator"></li>
              <li>
                <a className="Animated05">
                  <i className="fa fa-user"></i>Welcome To Electems
                  <i className="fa fa-chevron-down Fs14 Fright ShowOnMobile"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="BordRad3" id="layout-menu">
          <li>
            <i style={{ color: "white" }}></i>
            <Link to={"/companyList"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="fa fa-ellipsis-v menu-separator"></li>
          <li id="j_idt11:j_idt53">
            <a className="Animated05 CursPointer" href="#">
              <i className="fa fa-flask fa-2x"></i> Company
              <i className="fa fa-chevron-down Fs14 Fright ShowOnMobile"></i>
            </a>
          </li>
          <li className="fa fa-ellipsis-v menu-separator"></li>
          <li id="j_idt11:j_idt53">
            <a className="Animated05 CursPointer" href="#">
              <i className="fa fa-user fa-2x"></i> Department
              <i className="fa fa-chevron-down Fs14 Fright ShowOnMobile"></i>
            </a>
          </li>
          <li className="fa fa-ellipsis-v menu-separator"></li>

          <li id="j_idt11:j_idt53">
            <a className="Animated05 CursPointer" href="#">
              <i className="fa fa-group fa-2x"></i> Customers
              <i className="fa fa-chevron-down Fs14 Fright ShowOnMobile"></i>
            </a>
          </li>
          <li className="fa fa-ellipsis-v menu-separator"></li>
          <li id="j_idt11:j_idt53">
            <a className="Animated05 CursPointer">
              <i className="fa fa-file-text-o fa-2x"></i> Management
              <i className="fa fa-chevron-down Fs14 Fright ShowOnMobile"></i>
            </a>
          </li>
          <li className="fa fa-ellipsis-v menu-separator"></li>
          <li>
            <i className="" style={{ color: "white" }}></i>
            <Link to={"/companycharts"} className="nav-link">
              <i className="fa fa-bar-chart-o fa-1x"></i> Reports
            </Link>
          </li>
          <li className="topmenu_to_menu">
            <a
              id="headerForm:logOutLink"
              href="/MTR/j_spring_security_logout"
              className="Animated05"
            >
              <i className="fa fa-sign-out"></i>Logout
            </a>
          </li>
        </ul>
        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/", "/companyList"]}
              component={Companylistingdatables}
            />
            <Route path="/companyList" component={Companylistingdatables} />
            <Route path="/login" component={Login} />
            <Route path="/company" component={Company} />
            <Route path="/companycharts" component={CompanyCharts} />
            <Route path="/companyList" component={Companylistingdatables} />
            <Route path="/companyedit/:id" component={companyedit} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
