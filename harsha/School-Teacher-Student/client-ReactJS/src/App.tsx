import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddSchool from "./components/school/add-school.component";
import EditSchool from "./components/school/edit-school.component";
import SchoolsList from "./components/school/school-list.component";
import AddStudent from "./components/student/add-student.component";
import StudentsList from "./components/student/student-list.component";
import AddTeacher from "./components/teacher/add-teacher.component";
import TeachersList from "./components/teacher/teacher-list.component";
import EditTeacher from "./components/teacher/edit-teacher.component";
import EditStudent from "./components/student/edit-student.component";
import Charts from "./components/charts.component";
import SchoolDataTable from "./components/school/data-table.component";


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
            <li className="nav-item">
              <Link to={"/charts"} className="nav-link">
                Charts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/data"} className="nav-link">
                DataTables
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/schools"]} component={SchoolsList} />
            <Route exact path="/teachers" component={TeachersList} />
            <Route exact path="/students" component={StudentsList} />
            <Route path="/add-school" component={AddSchool} />
            <Route path="/add-teacher" component={AddTeacher} />
            <Route path="/add-student" component={AddStudent} />
            <Route path="/schools/:id" component={EditSchool} />
            <Route path="/teachers/:id" component={EditTeacher} />
            <Route path="/students/:id" component={EditStudent} />
            <Route path="/charts" component={Charts} />
            <Route path="/data" component={SchoolDataTable} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
