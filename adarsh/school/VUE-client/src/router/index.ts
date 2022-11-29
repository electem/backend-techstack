import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  
  {
    path: "/",
    name: "/school",
    alias: "school",
    component: () => import("../components/SchoolList.vue")
  },
  {
    path: "/tutorials",
    name: "tutorials",
    component: () => import("../components/TutorialsList.vue")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("../components/TutorialDetails.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddSchool.vue")
  },
  {
    path: "/school",
    name: "school",
    component: () => import("../components/SchoolList.vue")
  },
  {
    path: "/schools/:id",
    name: "SchoolEdit",
    component: () => import("../components/SchoolEdit.vue")
  },
  {
    path: "/student",
    name: "sstudenthool",
    component: () => import("../components/StudentList.vue")
  },
  {
    path: "/student",
    name: "sstudenthool",
    component: () => import("../components/StudentList.vue")
  },
  {
    path: "/students/:id",
    name: "StudentEdit",
    component: () => import("../components/StudentEdit.vue")
  },
  {
    path: "/studentsAdd",
    name: "AddStudent",
    component: () => import("../components/AddStudent.vue")
  },
  {
    path: "/teacher",
    name: "TeacherList",
    component: () => import("../components/TeacherList.vue")
  },
  {
    path: "/teachers/:id",
    name: "TeacherList",
    component: () => import("../components/TeacherEdit.vue")
  },
  {
    path: "/addTeacher",
    name: "AddTeacher",
    component: () => import("../components/AddTeacher.vue")
  },
  {
    path: "/table",
    name: "DataTablee",
    component: () => import("../components/VueDataTable.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
