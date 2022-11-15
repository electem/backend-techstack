/* eslint-disable prettier/prettier */
import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./components/TutorialsList.vue"),
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./components/TutorialDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial.vue"),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
