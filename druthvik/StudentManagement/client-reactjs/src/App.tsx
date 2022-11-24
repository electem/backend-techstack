import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddSchool from "./components/school/school.component";
import SchoolList from "./components/school/schoollist.component";
import StudentsList from "./components/students/sudents-list.component";
import AddStudent from "./components/students/studentadd.component";
import TeacherList from "./components/teacher/teacherlist.component";
import AddTeacher from "./components/teacher/addteacher.component";
import { charts } from "./components/chartjs/chartjs.component";
import { StudentsListingDatatables } from "./components/students/studentlistingdatatbles";
import { chartsStudents } from "./components/chartjs/chartstudent";
import studentedit from "./components/students/studentedit.component";
import EditSchool from "./components/school/schooledit.component";
import EditTeacher from "./components/teacher/editteacher.component";
import AddSchoolValid from "./components/school/addschool.component";
import PieChart from "./components/chartjs/chartexamples";
import SchoolCharts from "./components/school/schoolchart.component";
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
              <Link to={"/schools"} className="nav-link">
                School List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/student"} className="nav-link">
                Add Student
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/studentlist"} className="nav-link">
                Student list
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/teacherlist"} className="nav-link">
                Teacher list
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/teacher"} className="nav-link">
                Add Teacher
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/stud"} className="nav-link">
                Datatables
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/SchoolCharts"} className="nav-link">
                chart
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/pie"} className="nav-link">
                Pie
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/schools"]} component={SchoolList} />
            <Route path="/school" component={AddSchool} />
            <Route path="/schoolsedit/:id" component={EditSchool} />
            <Route path="/students/:id" component={studentedit} />
            <Route path="/studentlist" component={StudentsList} />
            <Route path="/student" component={AddStudent} />
            <Route path="/teacheredit/:id" component={EditTeacher} />
            <Route path="/teacherlist" component={TeacherList} />
            <Route path="/teacher" component={AddTeacher} />
            <Route path="/charts" component={charts} />
            <Route path="/stud" component={StudentsListingDatatables} />
            <Route path="/chartstud" component={chartsStudents} />
            <Route path="/valid" component={AddSchoolValid} />
            <Route path="/pie" component={PieChart} />
            <Route path="/SchoolCharts" component={SchoolCharts} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
