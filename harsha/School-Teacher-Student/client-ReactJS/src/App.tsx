import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SchoolsList from "./components/school-list.component";
import TeachersList from "./components/teacher-list.component";
import StudentsList from "./components/student-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/schools"} className="nav-link">
                Schools
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/teachers"} className="nav-link">
                Teachers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Students
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/schools"]} component={SchoolsList} />
            <Route exact path= "/teachers" component={TeachersList} />
            <Route exact path= "/students" component={StudentsList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
