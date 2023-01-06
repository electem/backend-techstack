import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomerList from "./components/customerlisting.component";
import UploadImages from "./components/fileupload";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto"></div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/customer"]} component={CustomerList} />
            <Route path="/customerList" component={CustomerList} />
            <Route path="/upload" component={UploadImages} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
