/* eslint-disable prettier/prettier */
import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/tablelist",
    alias: "/tablelist",
    name: "tablelist",
    component: () => import("./components/TableList.vue"),
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
  },
  {
    path: "/student/:id",
   name: "edit-student",
    component: () => import("./components/Editstudent.vue"),
  }
  ,
  {
    path: "/BarChart",
   name: "bar-chart",
    component: () => import("./components/Barchart.vue"),
  },
  {
    path: "/datatable",
   name: "Datatable",
    component: () => import("./components/Datatable.vue"),
  } ,
  {
    path: "/LineChart",
   name: "line-chart",
    component: () => import("./components/Linechart.vue"),
  }
  ,
  {
    path: "/charts",
   name: "charts",
    component: () => import("./components/Chart.vue"),
  },
  {
    path: "/",
   name: "dashboard",
    component: () => import("./components/Dashboard.vue"),
  },
  {
    path: "/forms",
   name: "forms",
    component: () => import("./components/Forms.vue"),
  },
  {
    path: "/datatableapp",
   name: "datatable",
    component: () => import("./components/Datatableapp.vue"),
  },
  {
    path: "/forms/:id",
   name: "editforms",
    component: () => import("./components/EditForms.vue"),
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
