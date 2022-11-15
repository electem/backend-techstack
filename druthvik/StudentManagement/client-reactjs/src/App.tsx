import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddSchool from "./components/school/school.component";
import SchoolList from "./components/school/schoollist.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/school"} className="nav-link">
                Add school
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/schoollist"} className="nav-link">
                School List
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/schoollist"]} component={SchoolList} />
            <Route path="/school" component={AddSchool} />
            <Route path="/schoollist" component={SchoolList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
