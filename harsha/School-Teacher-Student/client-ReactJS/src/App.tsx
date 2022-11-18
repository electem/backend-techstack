import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SchoolsList from "./components/school-list.component";
import TeachersList from "./components/teacher-list.component";
import StudentsList from "./components/student-list.component";
import AddSchool from "./components/add-school.component";
import AddTeacher from "./components/add-teacher.component";
import AddStudent from "./components/add-student.component";
import EditSchool from "./components/edit-school.component";

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
            <Route exact path="/teachers" component={TeachersList} />
            <Route exact path="/students" component={StudentsList} />
            <Route path="/add-school" component={AddSchool} />
            <Route path="/add-teacher" component={AddTeacher} />
            <Route path="/add-student" component={AddStudent} />
            <Route path="/schools/:id" component={EditSchool} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
