import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PanelsList from "./components/panel/panels-list.component";
import AddPanel from "./components/panel/add-panel.component";
import Dashboard from "./components/panel/dashboard.component";
import PanelDataTable from "./components/panel/data-tables.component";
import EditPanel from "./components/panel/edit-panel.component";

class App extends Component {
  render() {
    return (
      <>
        <div>
          <Switch>
            <Route exact path="/panels" component={PanelsList} />
            <Route path="/add-panel" component={AddPanel} />
            <Route exact path={["/dashboard"]} component={Dashboard} />
            <Route exact path={["/data-table"]} component={PanelDataTable} />
            <Route exact path="/panels/:id" component={EditPanel} />
          </Switch>
        </div>
          <link href="css/lib/chartist/chartist.min.css" rel="stylesheet"></link>
          <link href="css/lib/font-awesome.min.css" rel="stylesheet"></link>
          <link href="css/lib/themify-icons.css" rel="stylesheet"></link>
          <link href="css/lib/owl.carousel.min.css" rel="stylesheet"></link>
          <link href="css/lib/owl.theme.default.min.css" rel="stylesheet"></link>
          <link href="css/lib/menubar/sidebar.css" rel="stylesheet"></link>
          <link href="css/lib/bootstrap.min.css" rel="stylesheet"></link>
          <link href="css/lib/helper.css" rel="stylesheet"></link>
          <link href="css/style.css" rel="stylesheet"></link>
        <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
          <div className="nano">
            <div className="nano-content">
              <ul>
                <div className="logo"></div>
                <li>
                  <a className="sidebar-sub-toggle" href="/dashboard">
                    <i className="ti-home"></i> Dashboard
                  </a>
                </li>
                <li>
                  <a className="sidebar-sub-toggle" href="/data-table">
                    <i className="ti-layout-grid4-alt"></i> Panels
                  </a>
                </li>
                <li>
                  <a className="sidebar-sub-toggle">
                    <i className="ti-layout-grid4-alt"></i> Tests
                  </a>
                </li>
                <li>
                  <a className="sidebar-sub-toggle" href="/panels">
                    <i className="ti-view-list-alt"></i> Reports
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
