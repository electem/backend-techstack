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
    path: "/school",
    alias: "/school-list",
    name: "school",
    component: () => import("./components/SchoolListing.vue"),
  },
  {
    path: "/teacher",
    alias: "/teacher-list",
    name: "teachers",
    component: () => import("./components/TeacherListing.vue"),
  },
  {
    path: "/student",
    alias: "/student-list",
    name: "students",
    component: () => import("./components/StudentListing.vue"),
  },
  {
    path: "/createteacher",
    alias: "/createteacher",
    name: "teacher",
    component: () => import("./components/CreateTeacher.vue"),
  },
  {
    path: "/createstudent",
    alias: "/createstudent",
    name: "student",
    component: () => import("./components/CreateStudent.vue"),
  },  
  {
    path: "/createschool",
    alias: "/createschool",
    name: "add-school",
    component: () => import("./components/Createschool.vue"),
  },{
    path: "/school/:id",
   name: "edit-school",
    component: () => import("./components/Editschool.vue"),
  },
  {
    path: "/teacher/:id",
   name: "edit-teacher",
    component: () => import("./components/Editteacher.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
