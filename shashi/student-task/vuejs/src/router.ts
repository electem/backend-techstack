/* eslint-disable prettier/prettier */
import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/datatable",
    name: "datatable",
    component: () => import("./components/Datatable.vue"),
  },
  {
    path: "/",
    alias: "/school",
    name: "schoolist",
    component: () => import("./components/SchoolList.vue"),
  },
  {
    path: "/addschool",
    name: "addschool",
    component: () => import("./components/AddSchool.vue"),
  },
  {
    path: "/studentlist",
    name: "studentlist",
    component: () => import("./components/StudentList.vue"),
  },
  {
    path: "/addstudent",
    name: "addstudent",
    component: () => import("./components/AddStudent.vue"),
  },
  {
    path: "/teacherslist",
    name: "teacherslist",
    component: () => import("./components/TeacherList.vue"),
  },
  {
    path: "/addteacher",
    name: "addteacher",
    component: () => import("./components/AddTeacher.vue"),
  },
  {
    path: "/school/:id",
    name: "edit-school",
    component: () => import("./components/EditSchool.vue"),
  },
  {
    path: "/student/:id",
    name: "edit-student",
    component: () => import("./components/EditStudent.vue"),
  },
  {
    path: "/teacher/:id",
    name: "edit-teacher",
    component: () => import("./components/EditTeacher.vue"),
  },
  {
    path: "/customecharts",
    name: "customecharts",
    component: () => import("./components/LineCharts.vue"),
  },
  {
    path: "/piechart",
    name: "piechart",
    component: () => import("./components/PieChart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
